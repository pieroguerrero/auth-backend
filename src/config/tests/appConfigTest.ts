import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";

const configureApp = () => {
  const testApp: Application = express();
  testApp.use(cors());
  testApp.use(helmet());

  testApp.use(morgan("dev")); //To print in the dev console, all the requests that are comming to the application
  testApp.use(express.json()); //To let the appplication understand data in json format when it comes in the Request.body

  testApp.use(cookieParser());

  testApp.use(compression());

  return testApp;
};

export { configureApp };
