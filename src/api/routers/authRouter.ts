import { signIn, signUp, verifyAccount } from "../controllers/authControllers";
import { Router } from "express";

const router = Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/emailconfirmation/:token", verifyAccount);

export { router as authRoutes };
