// src/routes/user.routes.ts
import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
} from '../controllers/user.controller';
import { protect } from '../middlewares/protect';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile); // ← Add this

export default router;
