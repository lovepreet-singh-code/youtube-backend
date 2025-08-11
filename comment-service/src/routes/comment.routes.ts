import express from 'express';
import {
  addComment,
  getVideoComments,
  updateComment,
  deleteComment
} from '../controllers/comment.controller';
import { protect } from '../middlewares/protect';

const router = express.Router();

router.post('/', protect, addComment);
router.get('/:videoId', getVideoComments);
router.put('/:id', protect, updateComment);
router.delete('/:id', protect, deleteComment);

export default router;
