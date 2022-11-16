import {
  signIn,
  signUp,
  profile,
  about,
  confirmEmail,
} from "../controllers/authController";
import { Router } from "express";
import { JwtTokenValidador } from "../middlewares/jwtTokenValidador";

const router = Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

router.get("/emailconfirmation/:token", confirmEmail);

//As '/profile' is a protected route, we have to pass the JwtTokenValidador first as middleware before it arrives to the profile function.
router.get("/profile", JwtTokenValidador, profile);

router.get("/about", about);

export { router as authRoutes };
