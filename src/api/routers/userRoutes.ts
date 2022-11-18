import { profile } from "../../api/controllers/userControllers";
import { Router } from "express";
import { getJwtTokenValidador } from "../middlewares/jwtTokenValidador";

const getUserRouter = () => {
  const router = Router();

  //As '/profile' is a protected route, we have to pass the JwtTokenValidador first as middleware before it arrives to the profile function.
  router.get("/profile", getJwtTokenValidador(), profile);

  return router;
};

export { getUserRouter };
