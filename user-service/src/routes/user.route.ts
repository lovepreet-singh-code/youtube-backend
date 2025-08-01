import express from 'express';
import {
  register,
  login,
  getProfile,
  updateProfile,
  logout,
  subscribe,
  unsubscribe,
  getAllSubscribers,
  getSubscribed,
} from '../controllers/user.controller';
import { protect } from '../middlewares/protect';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);

router.post('/logout', protect, logout);
router.post('/:id/subscribe', protect, subscribe);
router.post('/:id/unsubscribe', protect, unsubscribe);
router.get('/:id/subscribers', getAllSubscribers);
router.get('/me/subscriptions', protect, getSubscribed);

export default router;
