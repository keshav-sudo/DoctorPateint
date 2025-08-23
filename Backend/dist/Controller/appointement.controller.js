import { PrismaClient, Role, AppointmentStatus } from "@prisma/client";
import { z } from "zod";
const prisma = new PrismaClient();
const bookAppointmentSchema = z.object({
    doctorId: z.string().cuid("Invalid doctor ID format."),
    when: z.string().datetime("Invalid date format. Please use ISO 8601 format."),
});
export const bookAppointment = async (req, res) => {
    try {
        if (req.user && req.user.role !== "PATIENT") {
            return res.status(403).json({
                message: "Forbidden: Only patients can book appointments.",
                success: false,
            });
        }
        const validationResult = bookAppointmentSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
        }
        const { doctorId, when } = validationResult.data;
        const patientId = req.user.id;
        const newAppointment = await prisma.appointment.create({
            data: {
                patientId,
                doctorId,
                when: new Date(when),
                status: AppointmentStatus.PENDING,
            },
        });
        res.status(201).json({
            message: "Appointment booked successfully!",
            appointment: newAppointment,
        });
    }
    catch (error) {
        console.error("Error booking appointment:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};
export const getPatientAppointments = async (req, res) => {
    try {
        const patientId = req.user.id;
        const appointments = await prisma.appointment.findMany({
            where: { patientId },
            include: {
                doctor: {
                    select: { name: true },
                },
            },
            orderBy: { when: 'desc' }
        });
        res.status(200).json({ data: appointments });
    }
    catch (error) {
        console.error("Error fetching patient appointments:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};
export const getDoctorAppointments = async (req, res) => {
    try {
        const doctorId = req.user.id;
        if (req.user.role !== Role.DOCTOR) {
            return res.status(403).json({ message: "Forbidden: Only doctors can access this route." });
        }
        const appointments = await prisma.appointment.findMany({
            where: { doctorId },
            include: {
                patient: {
                    select: { name: true },
                },
            },
            orderBy: { when: 'asc' }
        });
        res.status(200).json({ data: appointments });
    }
    catch (error) {
        console.error("Error fetching doctor appointments:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};
export const markAppointmentCompleted = async (req, res) => {
    try {
        const { id } = req.params;
        const doctorId = req.user.id;
        if (req.user.role !== Role.DOCTOR) {
            return res.status(403).json({ message: "Forbidden: Only doctors can perform this action." });
        }
        const appointment = await prisma.appointment.findFirst({
            where: { id, doctorId }
        });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found or you do not have permission to modify it." });
        }
        const updatedAppointment = await prisma.appointment.update({
            where: { id },
            data: { status: AppointmentStatus.COMPLETED },
        });
        res.status(200).json({
            message: "Appointment marked as completed.",
            appointment: updatedAppointment,
        });
    }
    catch (error) {
        console.error("Error marking appointment as completed:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};
