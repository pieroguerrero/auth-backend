import {
  jwtTokenValidador,
  signIn2,
  signUp2,
  profile,
} from "../controllers/authController";
import { Router } from "express";
import { TokenValidation } from "../middlewares/verifyToken";

const router = Router();

router.post("/signup", signUp2);

router.post("/signin", signIn2);

//As '/profile' is a protected route, we have to pass the TokenValidation first as middleware before it arrives to the profile function.
//router.get("/profile", TokenValidation, profile);
router.get("/profile", jwtTokenValidador, profile);

export { router as authRoutes };
