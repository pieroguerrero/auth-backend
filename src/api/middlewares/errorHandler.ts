import envValues from "../../config/envConfig";
import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message,
    stack: envValues.NodeEnv === "production" ? "" : err.stack,
  });
};

export default errorHandler;
