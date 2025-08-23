import { PrismaClient } from "@prisma/client";
import { loginSchema, registerSchema } from "../Types/authschema.js"; // Added loginSchema import
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Dotenv from "../Utils/Dotenv.js";
// --- Setup and Validation ---
// This check ensures the server won't start without the secret key.
if (!Dotenv.JWT_SECRET) {
    throw new Error("FATAL ERROR: JWT_SECRET is not defined in the .env file.");
}
const JWT_SECRET = Dotenv.JWT_SECRET;
const prisma = new PrismaClient();
export const register = async (req, res) => {
    try {
        const validationResult = registerSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: validationResult.error.flatten().fieldErrors,
            });
        }
        const { email, password, name, role } = validationResult.data;
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(409).json({ message: "A user with this email already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name, email, password: hashedPassword, role },
        });
        const payload = { id: newUser.id, role: newUser.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    }
    catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};
export const login = async (req, res) => {
    try {
        console.log("entered login");
        const validationResult = loginSchema.safeParse(req.body);
        if (!validationResult.success) {
            return res.status(400).json({
                message: "Invalid input",
                errors: validationResult.error.flatten().fieldErrors,
            });
        }
        const { email, password } = validationResult.data;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        const payload = { id: user.id, role: user.role };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).json({
            message: "User logged in successfully.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    }
    catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};
export const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: "User logged out successfully." });
    }
    catch (error) {
        console.error("Error during logout:", error);
        res.status(500).json({ message: "An internal server error occurred." });
    }
};
