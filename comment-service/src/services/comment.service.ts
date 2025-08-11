import { Comment } from '../models/comment.model';

export const addComment = async (userId: string, videoId: string, text: string) => {
  return await Comment.create({ userId, videoId, text });
};

export const getCommentsByVideo = async (videoId: string) => {
  return await Comment.find({ videoId }).sort({ createdAt: -1 });
};

export const updateComment = async (id: string, userId: string, text: string) => {
  const comment = await Comment.findById(id);
  if (!comment || comment.userId.toString() !== userId)
    throw new Error('Unauthorized or not found');

  comment.text = text;
  return await comment.save();
};

export const deleteComment = async (id: string, userId: string) => {
  const comment = await Comment.findById(id);
  if (!comment || comment.userId.toString() !== userId)
    throw new Error('Unauthorized or not found');

  await comment.deleteOne();
};

