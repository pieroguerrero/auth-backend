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

const app: Application = express();

//#region Settings
app.set("port", config.Port);
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

//#endregion
export default app;
