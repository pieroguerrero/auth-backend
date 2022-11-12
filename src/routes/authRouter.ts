import { profile, signIn, signUp } from "../controllers/authController";
import { Router } from "express";
import { TokenValidation } from "../middlewares/verifyToken";

const router = Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

//As '/profile' is a protected route, we have to pass the TokenValidation first as middleware before it arrives to the profile function.
router.get("/profile", TokenValidation, profile);

export { router as authRoutes };
