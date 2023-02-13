import errorHandler from "../api/middlewares/errorHandler";
import notFound from "../api/middlewares/notFound";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { getAuthRouter } from "../api/routers/authRouter";
import { getHomeRouter } from "../api/routers/homeRoutes";
import { getUserRouter } from "../api/routers/userRoutes";
import config from "./envConfig";
import { configurePassportMiddlewares } from "./passportConfig";

const configureApp = () => {
  const app: Application = express();

  //#region Settings
  app.set("port", config.Port);

  //Setting when the server is behind a Load Balancer or a Reverse Proxy, making the rate limiter effectively a global one and blocking all requests once the limit is reached. Check more at: https://github.com/express-rate-limit/express-rate-limit
  app.set("trust proxy", 1 /*numberOfProxies*/);
  //#endregion

  //#region Middlewares
  app.use(cors());
  app.use(helmet());

  app.use(morgan("dev")); //To print in the dev console, all the requests that are comming to the application
  app.use(express.json()); //To let the appplication understand data in json format when it comes in the Request.body
  app.use(express.urlencoded({ extended: true })); //To encode the data that is comming in Request.body
  //Checking if we really need for the cookie parser
  if (config.tokenFromCookie) {
    app.use(cookieParser());
  }
  app.use(compression());

  configurePassportMiddlewares();
  //#endregion

  //#region Routes
  app.use("/api/home/", getHomeRouter());
  app.use("/api/auth", getAuthRouter());
  app.use("/api/user/", getUserRouter());

  app.use(notFound);
  app.use(errorHandler);

  return app;
};
//#endregion
export default configureApp;
