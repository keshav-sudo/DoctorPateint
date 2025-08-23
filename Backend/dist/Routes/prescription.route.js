import { Router } from "express";
import { createPrescription, getPrescriptionForAppointment } from "../Controller/prescription.controller.js";
import { middleware } from "../Middleware/middleware.js";
const router = Router();
router.use(middleware);
router.post("/", createPrescription);
router.get("/appointment/:appointmentId", getPrescriptionForAppointment);
export default router;
