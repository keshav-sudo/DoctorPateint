import { getme } from "../Controller/user.controller.js";
import { Router } from "express";
import { middleware } from "../Middleware/middleware.js";

const router = Router();

router.get("/me", middleware, getme);

export default router;
