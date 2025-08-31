import { getme , getall } from "../Controller/user.controller.js";
import { Router } from "express";
import { middleware } from "../Middleware/middleware.js";

const router = Router();

// router.get("/me", middleware, getme);
router.get("/me/dash", middleware, getall);
export default router;
 