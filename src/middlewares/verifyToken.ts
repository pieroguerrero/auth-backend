import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { generalValues } from "../util/Enums";
import HttpStatusCodes from "../util/HttpStatusCodes";
import { IReq } from "types/shared";
import config from "./../config";

const TokenValidation = (
  req: IReq<{ userId: string }>,
  res: Response,
  next: NextFunction
) => {
  //Obtaining the value of the token that is stored in a special and self defined property
  const token = req.header(generalValues.HEADER_TOKEN_NAME);

  if (!token)
    return res.status(HttpStatusCodes.UNAUTHORIZED).json("Access denied.");

  const payload = jwt.verify(token, config.jwtSecretToken);

  console.log("payload:", payload);

  //TODO: req.body.userId = ; Here is pending to add the Id of the user so it can be used further in the app

  next();
};

export { TokenValidation };
