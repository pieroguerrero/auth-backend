import HttpStatusCodes from "../../api/util/HttpStatusCodes";
import { Request, Response } from "express";

const about = (_req: Request, res: Response) => {
  res.status(HttpStatusCodes.OK).json({ message: "About!" });
};

export { about };
