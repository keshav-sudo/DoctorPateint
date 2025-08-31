import express, { Request, Response } from "express"; 
import cors from "cors";
import cookieParser from "cookie-parser";
import Dotenv from "./Utils/Dotenv.js"; 

import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";
import doctorRoutes from "./Routes/doctor.route.js";
import appointmentRoutes from "./Routes/appointment.route.js";
import prescriptionRoutes from "./Routes/prescription.route.js";

const app = express();

app.use(cors({
  origin: ["http://localhost:5173" , "http://localhost:5000"],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/prescriptions", prescriptionRoutes);


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "All is ok ✅"
  });
});


const PORT = Dotenv.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Your App is listening on port ${PORT}`);
});
