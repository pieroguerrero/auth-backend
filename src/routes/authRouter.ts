import { signIn, signUp, profile } from "../controllers/authController";
import { Router } from "express";
import { JwtTokenValidador } from "../middlewares/jwtTokenValidador";

const router = Router();

router.post("/signup", signUp);

router.post("/signin", signIn);

//As '/profile' is a protected route, we have to pass the TokenValidation first as middleware before it arrives to the profile function.
router.get("/profile", JwtTokenValidador, profile);
//TODO: check this post to know what else can be done: https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314

export { router as authRoutes };
