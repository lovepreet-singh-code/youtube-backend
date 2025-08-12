import express from 'express';
import { protect } from '../middlewares/protect';
import {
  likeVideo,
  unlikeVideo,
  videoLikeCount,
  isVideoLiked,
  likeComment,
  unlikeComment,
  commentLikeCount,
  isCommentLiked,
  userLikedVideos,
  userLikedComments
} from '../controllers/like.controller';

const router = express.Router();

// Video like routes
router.post('/video/:videoId', protect, likeVideo);
router.delete('/video/:videoId', protect, unlikeVideo);
router.get('/video/:videoId/count', videoLikeCount);
router.get('/video/:videoId/is-liked', protect, isVideoLiked);

// Comment like routes
router.post('/comment/:commentId', protect, likeComment);
router.delete('/comment/:commentId', protect, unlikeComment);
router.get('/comment/:commentId/count', commentLikeCount);
router.get('/comment/:commentId/is-liked', protect, isCommentLiked);

// User liked list
router.get('/user/videos', protect, userLikedVideos);
router.get('/user/comments', protect, userLikedComments);

export default router; 
