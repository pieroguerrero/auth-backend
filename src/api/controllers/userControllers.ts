import HttpStatusCodes from "../../api/util/HttpStatusCodes";
import { Request, Response } from "express";

const profile = (req: Request, res: Response) => {
  //We get the req.user with the information from the user
  res.status(HttpStatusCodes.OK).json(req.user);
};

export { profile };
