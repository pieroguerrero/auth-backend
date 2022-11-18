import { about } from "../../api/controllers/homeControllers";
import { Router } from "express";

const getHomeRouter = () => {
  const router = Router();

  router.get("/about", about);

  return router;
};

export { getHomeRouter };
