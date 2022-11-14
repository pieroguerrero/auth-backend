import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import passport from "passport";
import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import { generalValues } from "../util/Enums";
import config from "./../config";
import { passwordUtil } from "../util/passwordUtil";
import HttpStatusCodes from "../util/HttpStatusCodes";

//#region old Authentication controllers
const signUp = async (req: Request, res: Response) => {
  const user = new User({
    username: req.body.username,
    password: await passwordUtil.encryptPassword(req.body.password),
    email: req.body.email,
  });

  try {
    //user.password = await passwordUtil.encryptPassword(user.password);

    const createdUSer = await user.save();

    const token = jwt.sign({ _id: createdUSer._id }, config.jwtSecretToken);

    //Returning both the recently created user and the registered token
    res.header(generalValues.HEADER_TOKEN_NAME, token).json(createdUSer);
  } catch (error) {
    console.error(error);
  }
};
const signIn = async (req: Request, res: Response) => {
  //Looking for the user in the DB
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    res.json("Wrong Emaill or Password.");
    return;
  }

  const validPassword = await passwordUtil.validatePassword(
    req.body.password,
    user.password
  );

  if (!validPassword) {
    res.json("Wrong Password.");
    return;
  }

  try {
    const token = jwt.sign({ _id: user._id }, config.jwtSecretToken, {
      expiresIn: 60 * 10,
    });

    res
      .header(generalValues.HEADER_TOKEN_NAME, token)
      .json("Successful login!!!");
  } catch (error) {
    console.error(error);
  }
};
//#endregion

const signUp2 = async (req: Request, res: Response) => {
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

const signIn2 = async (req: Request, res: Response) => {
  passport.authenticate("local", { session: false }, (error, user: IUser) => {
    if (error || !user) {
      return res.status(400).json({ error });
    }

    //We create the payload to be encrypted then in the JWT
    const payload = {
      username: user.username,
      expires: Date.now() + config.jwtTokenExpirationInMS,
    };

    req.login(payload, { session: false }, (error) => {
      if (error) {
        res.status(HttpStatusCodes.BAD_REQUEST).send({ error });
      }

      //generate a signed json web token and return it in the response
      const token = jwt.sign(JSON.stringify(payload), config.jwtSecretToken);

      //assign our jwt to the cookie
      res.cookie("jwt", token, { httpOnly: true });

      res.status(HttpStatusCodes.OK).send({ username: user.username });
    });
  })(req, res);

  //auth
};

const profile = (req: Request, res: Response) => {
  res.send("Profile");
};

const jwtTokenValidador = passport.authenticate("jwt", { session: false });

export { signUp, signIn, profile, jwtTokenValidador, signUp2, signIn2 };
