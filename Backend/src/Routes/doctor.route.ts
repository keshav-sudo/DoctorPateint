import { Router } from "express";
import { getAllDoctors } from "../Controller/doctor.controller.js";
import { middleware } from "../Middleware/middleware.js";

const router = Router();

router.get("/", middleware, getAllDoctors);

export default router;
