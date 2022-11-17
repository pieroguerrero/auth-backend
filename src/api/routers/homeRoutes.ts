import { about } from "../../api/controllers/homeControllers";
import { Router } from "express";

const router = Router();

router.get("/about", about);

export { router as homeRoutes };
