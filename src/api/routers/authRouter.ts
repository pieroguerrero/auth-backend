import { signIn, signUp, verifyAccount } from "../controllers/authControllers";
import { Router } from "express";

const getAuthRouter = () => {
  const router = Router();

  router.post("/signup", signUp);

  router.post("/signin", signIn);

  router.get("/emailconfirmation/:token", verifyAccount);

  return router;
};

export { getAuthRouter };
