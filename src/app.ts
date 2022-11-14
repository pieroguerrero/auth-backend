import express, { Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { configurePassportMiddlewares } from "./passportConfig";
//import passport from "passport";
import { authRoutes } from "./routes/authRouter";

const app: Application = express();

//#region Settings
app.set("port", 3000);

//#endregion

//#region Middlewares
app.use(morgan("dev")); //To print in the dev console, all the requests that are comming to the application
app.use(express.json()); //To let the appplication understand data in json format when it comes in the Request.body
app.use(express.urlencoded({ extended: true })); //To encode the data that is comming in Request.body
app.use(cookieParser());

//app.use(passport.initialize());
configurePassportMiddlewares();
//#endregion

//#region Routes
app.use("/api/auth", authRoutes);

//#endregion

export default app;
