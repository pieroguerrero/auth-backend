import { IAuthPayload } from "../interfaces/shared";
import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import passport from "passport";
import { sendVerificationEmail } from "../services/emailService";
import {
  generateAuthorizationToken,
  getUserVerificationURL,
} from "../services/jwtService";
import { createUser } from "../services/userService";
import envValues from "../../config/envConfig";
import User, { IUser } from "../models/user";
import HttpStatusCodes from "../util/HttpStatusCodes";

const returnErrorMessage = (res: Response, errorMessage: unknown) => {
  if (typeof errorMessage === "string") {
    res.status(HttpStatusCodes.BAD_REQUEST).json({ message: errorMessage });
    return;
  }

  if (errorMessage instanceof Error) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: errorMessage.message + " -> " + errorMessage.stack });
    return;
  }

  res.status(HttpStatusCodes.BAD_REQUEST).json({ message: errorMessage });
};

const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    returnErrorMessage(res, validationErrors.array());
    return;
  }

  try {
    const user = await createUser(
      req.body.username,
      req.body.email,
      req.body.password
    );

    if (typeof user === "string") {
      returnErrorMessage(res, "User was not created: " + user);
      return;
    }

    const requesOriginAddress = req.protocol + "://" + req.get("host");
    const verificationURL = getUserVerificationURL(
      user._id,
      requesOriginAddress
    );

    const emailSent = await sendVerificationEmail(user.email, verificationURL);

    if (!emailSent) {
      returnErrorMessage(
        res,
        "User was created but request verification email was not sent."
      );
      return;
    }

    res.status(HttpStatusCodes.OK).json({ username: user.username });
  } catch (error) {
    next(error);
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

//TODO: create a middleware or validator to receive username and password
const signIn = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("local", { session: false }, (error, user: IUser) => {
    if (error || !user) {
      returnErrorMessage(res, error ? error : "No User Found");
      return;
    }

    //We create the payload to be encrypted then in the JWT token
    const payload: IAuthPayload = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    try {
      //generate a signed json web token and return it in the response
      const token = generateAuthorizationToken(payload);

      //assign our jwt to the cookie. If there is no cookie set to true in the env variables file, then you are goin to use: Authorizarion Bearer <Token>
      if (envValues.tokenFromCookie) {
        res.cookie(envValues.jwtCookieName, token, { httpOnly: true });
      }

      res.status(HttpStatusCodes.OK).json({ ...payload, token });
    } catch (error) {
      next(error);
    }

    return;
  })(req, res, next);
};

const verifyAccount = async (req: Request, res: Response) => {
  try {
    const jwtPayload = jwt.verify(req.params.token, envValues.jwtSecretToken);

    if (typeof jwtPayload == "string" || !jwtPayload.userid) {
      res.status(HttpStatusCodes.BAD_REQUEST).json(jwtPayload);
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

export { signUp, signIn, verifyAccount };
