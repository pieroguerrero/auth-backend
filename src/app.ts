import express, { Application } from "express";
import morgan from "morgan";
import { authRoutes } from "./routes/authRouter";

const app: Application = express();

//Settings
app.set("port", 3000);

//Middlewares
app.use(morgan("dev")); //To print in the dev console, all the requests that are comming to the application
app.use(express.json()); //To let the appplication understand data in json format when it comes in the Request.body
app.use(express.urlencoded({ extended: true })); //To encode the data that is comming in Request.body

//Routes
app.use("/api/auth", authRoutes);

export default app;
