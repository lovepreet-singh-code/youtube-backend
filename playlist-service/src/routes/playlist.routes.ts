import express from 'express';
import { protect } from '../middlewares/protect';
import {
  createPlaylist,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  getPlaylist,
  getUserPlaylists,
  deletePlaylist
} from '../controllers/playlist.controller';

const router = express.Router();

router.post('/', protect, createPlaylist);
router.post('/:id/videos/:videoId', protect, addVideoToPlaylist);
router.delete('/:id/videos/:videoId', protect, removeVideoFromPlaylist);
router.get('/:id', getPlaylist);
router.get('/user/:userId', getUserPlaylists);
router.delete('/:id', protect, deletePlaylist);

export default router;
