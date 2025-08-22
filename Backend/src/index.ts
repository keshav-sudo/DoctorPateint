import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // <-- IMPORTANT
import Dotenv from "./Utils/Dotenv.js"; 
import authRoutes from "./Routes/auth.routes.js";
import userRoutes from "./Routes/user.routes.js";

const app = express();

// --- Middlewares ---
app.use(cors({
    origin: 'http://localhost:3000', // Change if your frontend is on a different port
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); // <-- IMPORTANT: This must be here

// --- API Routes ---
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes , ()=> {
  console.log("hittes")
});

// --- Start Listening ---
const PORT = Dotenv.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Your App is listening on port ${PORT}`);
});
