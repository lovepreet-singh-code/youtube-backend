import express from 'express';
import upload from '../config/multer';
import { uploadVideo } from '../controllers/video.controller';
import { protect } from '../middlewares/protect';

const router = express.Router();

router.post('/upload', protect, upload.single('video'), uploadVideo);

export default router;
