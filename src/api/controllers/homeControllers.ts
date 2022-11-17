import { Request, Response } from "express";

const about = (_req: Request, res: Response) => {
  //We get the req.user with the information from the user
  res.json("About!");
};

export { about };
