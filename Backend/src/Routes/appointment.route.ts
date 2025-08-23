import { Router } from "express";
import { 
    bookAppointment, 
    getPatientAppointments, 
    getDoctorAppointments, 
    markAppointmentCompleted 
} from "../Controller/appointement.controller.js";
import { middleware } from "../Middleware/middleware.js";

const router = Router();

router.use(middleware);
router.post("/", bookAppointment);
router.get("/my", getPatientAppointments);
router.get("/doctor", getDoctorAppointments);
router.patch("/:id/complete", markAppointmentCompleted);

export default router;
