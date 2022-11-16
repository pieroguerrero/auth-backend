import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "../../config/envConfig";
import HttpStatusCodes from "../util/HttpStatusCodes";
import { sendGmailEmail } from "../../api/services/emailService";
import envValues from "../../config/envConfig";

const registerUser = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: validationErrors.array() });
    return;
  }

  try {
    //verify the new username is unique
    const existingUser = await User.find({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (existingUser.length > 0) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({
        message: "The information provided belongs to an existing user!",
      });
      return;
    }

    //create the user with the Verified flag set to FALSE (default)
    const user = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, config.SaltLength),
      email: req.body.email,
    });

    const createdUSer = await user.save();

    //create token and url to be sent
    const token = jwt.sign({ userid: user._id }, config.jwtSecretToken, {
      expiresIn: "1d",
    });

    const emailConfirmationURL =
      "http://localhost:3000/api/auth/emailconfirmation/" + token;

    //send email
    sendGmailEmail(
      user.email,
      "Email Confirmation",
      "Confirm your email: " + emailConfirmationURL,
      ""
    );
    //let the user know that an email has been sent.

    res.status(200).json({ username: createdUSer.username });
  } catch (err) {
    res.status(HttpStatusCodes.BAD_REQUEST).send({
      message: err,
    });
  }

  return;
};

const signUp = [
  body("email").trim().isEmail(),
  body("username").trim().isLength({ min: 5 }),
  body(
    "password",
    "Password should have at least: eigth characters, one upper case character, one lower case character and one number."
  ).isStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minLowercase: 1,
  }),
  registerUser,
];

const signIn = async (req: Request, res: Response) => {
  passport.authenticate("local", { session: false }, (error, user: IUser) => {
    if (error || !user) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ message: error });
      return;
    }

    //We create the payload to be encrypted then in the JWT
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    try {
      //generate a signed json web token and return it in the response
      const token = jwt.sign(payload, config.jwtSecretToken, {
        expiresIn: config.jwtTokenExpiration,
      });

      //assign our jwt to the cookie. If you comment his, then you are goin to use: Authorizarion Bearer <Token>
      if (config.tokenFromCookie) {
        res.cookie(config.jwtCookieName, token, { httpOnly: true });
      }

      res.status(HttpStatusCodes.OK).json({ ...payload, token });
    } catch (error) {
      res.status(HttpStatusCodes.BAD_REQUEST).json({ message: error });
    }

    return;
  })(req, res);
};

const confirmEmail = async (req: Request, res: Response) => {
  try {
    const jwtPayload = jwt.verify(req.params.token, envValues.jwtSecretToken);

    if (typeof jwtPayload == "string" || !jwtPayload.userid) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "Invalid Token." });
      return;
    }

    const user = await User.findById(jwtPayload.userid).exec();

    if (!user) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: "Invalid User." });

      return;
    }

    user.verified = true;

    await user.save();

    res
      .status(HttpStatusCodes.OK)
      .json({ message: "Email confirmed successfully." });
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({
      message: error,
    });
  }
  return;
};

const profile = (req: Request, res: Response) => {
  //We get the req.user with the information from the user
  res.json(req.user);
};

const about = (req: Request, res: Response) => {
  //We get the req.user with the information from the user
  res.json("About!");
};

export { profile, signUp, signIn, about, confirmEmail };
