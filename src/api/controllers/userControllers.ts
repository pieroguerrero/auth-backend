import { Request, Response } from "express";

const profile = (req: Request, res: Response) => {
  //We get the req.user with the information from the user
  res.json(req.user);
};

export { profile };
