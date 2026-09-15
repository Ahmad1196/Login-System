import express from "express";
const router = express.Router();
import { registerUser } from '../controllers/authController.js';
import { validateRegister } from '../middlewares/validateRegister.js';

router.post("/register", validateRegister, registerUser);
export default router;
