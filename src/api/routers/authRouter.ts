import { signIn, signUp, verifyAccount } from "../controllers/authControllers";
import { Router } from "express";
import numberOfCallsLimiter from "../middlewares/numberOfCallsLimiter";
import speedOfCallsLimiter from "../middlewares/speedOfCallsLimiter";

const getAuthRouter = () => {
  const router = Router();

  //We protect the SignUp method to be called many times
  router.post("/signup", numberOfCallsLimiter, speedOfCallsLimiter, signUp);

  router.post("/signin", signIn);

  router.get("/emailconfirmation/:token", verifyAccount);

  return router;
};

export { getAuthRouter };
