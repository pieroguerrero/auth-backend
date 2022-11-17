import { profile } from "../../api/controllers/userControllers";
import { Router } from "express";
import { JwtTokenValidador } from "../middlewares/jwtTokenValidador";

const router = Router();

//As '/profile' is a protected route, we have to pass the JwtTokenValidador first as middleware before it arrives to the profile function.
router.get("/profile", JwtTokenValidador, profile);

export { router as userRoutes };
