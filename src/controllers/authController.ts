import { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import passport from "passport";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "./../config";
import HttpStatusCodes from "../util/HttpStatusCodes";

const registerUser = async (req: Request, res: Response) => {
  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ "Signup errors": validationErrors.array() });
  }

  try {
    const user = new User({
      username: req.body.username,
      password: await bcrypt.hash(req.body.password, config.SaltLength),
      email: req.body.email,
    });

    const createdUSer = await user.save();

    res.status(200).send({ username: createdUSer.username });
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).send({
      error: "req body should take the form { username, password, email }",
    });
  }
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
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ error });
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
      console.log(error);
    }
  })(req, res);
};

const profile = (req: Request, res: Response) => {
  //We get the req.user with the information from the user
  res.json(req.user);
};

const about = (req: Request, res: Response) => {
  //We get the req.user with the information from the user
  res.json("About!");
};

export { profile, signUp, signIn, about };
