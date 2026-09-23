import express from "express";
const router = express.Router();
import { registerUser, loginUser, getCurrentUser, logoutUser } from '../controllers/authController.js';
import { validateRegister } from '../middlewares/validateRegister.js';
import { protect } from '../middlewares/authMiddleware.js';

router.post("/register", validateRegister, registerUser);
router.post('/login', loginUser);
router.get('/me', protect, getCurrentUser);
router.post('/logout', logoutUser);
export default router;
