import { signIn, signUp, confirmEmail } from "../controllers/authControllers";
import { Router } from "express";

const router = Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/emailconfirmation/:token", confirmEmail);

export { router as authRoutes };
