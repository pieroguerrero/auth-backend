import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { generalValues } from "../util/Enums";
import HttpStatusCodes from "../util/HttpStatusCodes";
import { IReq } from "types/shared";

const TokenValidation = (
  req: IReq<{ userId: string }>,
  res: Response,
  next: NextFunction
) => {
  //Obtaining the value of the token that is stored in a special and self defined property
  const token = req.header(generalValues.HEADER_TOKEN_NAME);

  if (!token)
    return res.status(HttpStatusCodes.UNAUTHORIZED).json("Access denied.");

  const payload = jwt.verify(
    token,
    process.env.SECRET_TOKEN_KEY || generalValues.NO_SECRET_KEY
  );

  console.log("payload:", payload);
  //req.body.userId = ;

  next();
};

export { TokenValidation };
