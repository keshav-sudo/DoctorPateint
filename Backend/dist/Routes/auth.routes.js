import { register, login, logout } from "../Controller/auth.controller.js";
import { Router } from "express";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
export default router;
