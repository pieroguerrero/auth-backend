import { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";
import { generalValues } from "../util/Enums";

const signUp = async (req: Request, res: Response) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
  });

  try {
    user.password = await user.getEncrytedPassword();

    const createdUSer = await user.save();

    const token = jwt.sign(
      { _id: createdUSer._id },
      process.env.SECRET_TOKEN_KEY || generalValues.NO_SECRET_KEY
    );

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

  const validPassword = await user.validatePassword(req.body.password);

  if (!validPassword) {
    res.json("Wrong Password.");
    return;
  }

  try {
    const token = jwt.sign(
      { _id: user._id },
      process.env.SECRET_TOKEN_KEY || generalValues.NO_SECRET_KEY,
      { expiresIn: 60 * 10 }
    );

    res
      .header(generalValues.HEADER_TOKEN_NAME, token)
      .json("Successful login!");
  } catch (error) {
    console.error(error);
  }
};
const profile = (req: Request, res: Response) => {
  res.send("Profile");
};

export { signUp, signIn, profile };
