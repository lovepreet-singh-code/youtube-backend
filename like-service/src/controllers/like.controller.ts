import { Request, Response } from 'express';
import * as likeService from '../services/like.service';


//video like controller functions
export const likeVideo = async (req: Request & { userId?: string }, res: Response) => {
  const like = await likeService.likeItem(req.userId!, req.params.videoId, 'video');
  res.status(201).json(like);
};

export const unlikeVideo = async (req: Request & { userId?: string }, res: Response) => {
  await likeService.unlikeItem(req.userId!, req.params.videoId, 'video');
  res.status(200).json({ message: 'Video unliked' });
};

export const videoLikeCount = async (req: Request, res: Response) => {
  const count = await likeService.getLikeCount(req.params.videoId, 'video');
  res.json({ count });
};

export const isVideoLiked = async (req: Request & { userId?: string }, res: Response) => {
  const liked = await likeService.isLiked(req.userId!, req.params.videoId, 'video');
  res.json({ liked });
};

// Comment Likes
export const likeComment = async (req: Request & { userId?: string }, res: Response) => {
  const like = await likeService.likeItem(req.userId!, req.params.commentId, 'comment');
  res.status(201).json(like);
};

export const unlikeComment = async (req: Request & { userId?: string }, res: Response) => {
  await likeService.unlikeItem(req.userId!, req.params.commentId, 'comment');
  res.status(200).json({ message: 'Comment unliked' });
};

export const commentLikeCount = async (req: Request, res: Response) => {
  const count = await likeService.getLikeCount(req.params.commentId, 'comment');
  res.json({ count });
};

export const isCommentLiked = async (req: Request & { userId?: string }, res: Response) => {
  const liked = await likeService.isLiked(req.userId!, req.params.commentId, 'comment');
  res.json({ liked });
};


//userlike list comtrollers

export const userLikedVideos = async (req: Request & { userId?: string }, res: Response) => {
  const likes = await likeService.getUserLikedVideos(req.userId!);
  res.json(likes);
};

export const userLikedComments = async (req: Request & { userId?: string }, res: Response) => {
  const likes = await likeService.getUserLikedComments(req.userId!);
  res.json(likes);
};

