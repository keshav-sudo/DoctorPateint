import { PrismaClient, Role } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await prisma.user.findMany({
            where: {
                role: Role.DOCTOR,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
        if (!doctors || doctors.length === 0) {
            return res.status(404).json({ message: "No doctors found." });
        }
        res.status(200).json({
            message: "Doctors fetched successfully.",
            data: doctors,
        });
    }
    catch (error) {
        console.error("Error fetching doctors:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};
