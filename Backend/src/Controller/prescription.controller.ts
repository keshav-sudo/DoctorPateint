import { PrismaClient, Role } from "@prisma/client";
import { Request, Response } from "express";
import { any, z } from "zod";

const prisma = new PrismaClient();


const createPrescriptionSchema = z.object({
  appointmentId: z.string().cuid("Invalid appointment ID."),
  symptoms: z.string().min(3, "Symptoms are required."),
  diagnosis: z.string().min(3, "Diagnosis is required."),
  medicines: z.array(z.object({
      name: z.string(),
      dosage: z.string(),
      frequency: z.string(),
  })).min(1, "At least one medicine is required."),
  notes: z.string().optional(),
});


export const createPrescription = async (req: Request, res: Response) => {
  try {
 
    if (req.user!.role !== Role.DOCTOR) {
      return res.status(403).json({ message: "Forbidden: Only doctors can create prescriptions." });
    }

    const validationResult = createPrescriptionSchema.safeParse(req.body);
    if (!validationResult.success) {
      return res.status(400).json({ errors: validationResult.error.flatten().fieldErrors });
    }

    const { appointmentId, symptoms, diagnosis, medicines, notes } = validationResult.data;
    const doctorId = req.user!.id;

   
    const appointment = await prisma.appointment.findFirst({
        where: { id: appointmentId, doctorId: doctorId }
    });

    if (!appointment) {
        return res.status(404).json({ message: "Appointment not found or you are not authorized to prescribe for it." });
    }


    const newPrescription = await prisma.prescription.create({
      data: {
        appointmentId,
        symptoms,
        diagnosis,
        medicines, 
        notes,
      },
    });

    res.status(201).json({
      message: "Prescription created successfully.",
      prescription: newPrescription,
    });

  } catch (error : any) {
    if (error.code === 'P2002') { 
        return res.status(409).json({ message: "A prescription for this appointment already exists." });
    }
    console.error("Error creating prescription:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};


export const getPrescriptionForAppointment = async (req: Request, res: Response) => {
  try {
    const { appointmentId } = req.params;
    const userId = req.user!.id;

   
    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: {
        prescription: true,
      },
    });

    if (!appointment || !appointment.prescription) {
      return res.status(404).json({ message: "Prescription not found for this appointment." });
    }

   
    if (userId !== appointment.patientId && userId !== appointment.doctorId) {
        return res.status(403).json({ message: "Forbidden: You are not authorized to view this prescription." });
    }

    res.status(200).json({ data: appointment.prescription });

  } catch (error) {
    console.error("Error fetching prescription:", error);
    res.status(500).json({ message: "An internal server error occurred." });
  }
};
