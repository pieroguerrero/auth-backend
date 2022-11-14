import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import config from "./../config";
import HttpStatusCodes from "../util/HttpStatusCodes";

const signUp = async (req: Request, res: Response) => {
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

const signIn = async (req: Request, res: Response) => {
  passport.authenticate("local", { session: false }, (error, user: IUser) => {
    if (error || !user) {
      return res.status(400).json({ error });
    }

    //We create the payload to be encrypted then in the JWT
    const payload = {
      id: user._id,
      usename: user.username,
      email: user.email,
    };

    req.login(payload, { session: false }, (error) => {
      if (error) {
        res.status(HttpStatusCodes.BAD_REQUEST).send({ error });
      }

      //generate a signed json web token and return it in the response
      const token = jwt.sign(JSON.stringify(payload), config.jwtSecretToken);

      //assign our jwt to the cookie. If you comment his, then you are goin to use: Authorizarion Bearer <Token>
      if (config.tokenFromCookie) {
        res.cookie(config.jwtCookieName, token, { httpOnly: true });
      }

      res
        .status(HttpStatusCodes.OK)
        .json({ username: user.username, email: user.email, token });
    });
  })(req, res);

  //auth
};

const profile = (req: Request, res: Response) => {
  res.send(
    "Profile user= " +
      (req.user ? JSON.stringify(req.user) : "User data was not sent.")
  );
};

export { profile, signUp, signIn };
