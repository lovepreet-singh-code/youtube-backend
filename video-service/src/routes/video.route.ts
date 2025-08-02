import express from 'express';
import {
  uploadVideo,
  getAllVideos,
  getVideoById,
  getUserVideos,
  updateVideo,
  deleteVideo,
  searchVideos,
} from '../controllers/video.controller';
import upload from '../config/multer';
import { protect } from '../middlewares/protect';

const router = express.Router();

router.post('/upload', protect, upload.single('video'), uploadVideo);
router.get('/search', searchVideos); 
router.get('/', getAllVideos);
router.get('/user/:id', getUserVideos);
router.get('/:id', getVideoById);
router.put('/:id', protect, updateVideo);
router.delete('/:id', protect, deleteVideo);

export default router;
