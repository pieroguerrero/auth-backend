import express, { Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { configurePassportMiddlewares } from "./passportConfig";
import { authRoutes } from "../api/routers/authRouter";
import config from "./envConfig";
import cors from "cors";

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

configurePassportMiddlewares();
//#endregion

//#region Routes
app.use("/api/auth", authRoutes);

//#endregion
export default app;
