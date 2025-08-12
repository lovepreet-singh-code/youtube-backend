import { Like } from '../models/like.model';
import mongoose from 'mongoose';

export const likeItem = async (
  userId: string,
  targetId: string,
  targetType: 'video' | 'comment'
) => {
  const uId = new mongoose.Types.ObjectId(userId);
  const tId = new mongoose.Types.ObjectId(targetId);

  // Prevent duplicate likes
  const existingLike = await Like.findOne({ userId: uId, targetId: tId, targetType });
  if (existingLike) return existingLike;

  return await Like.create({ userId: uId, targetId: tId, targetType });
};

export const unlikeItem = async (
  userId: string,
  targetId: string,
  targetType: 'video' | 'comment'
) => {
  return await Like.findOneAndDelete({
    userId: new mongoose.Types.ObjectId(userId),
    targetId: new mongoose.Types.ObjectId(targetId),
    targetType
  });
};

export const getLikeCount = async (
  targetId: string,
  targetType: 'video' | 'comment'
) => {
  return await Like.countDocuments({
    targetId: new mongoose.Types.ObjectId(targetId),
    targetType
  });
};

export const isLiked = async (
  userId: string,
  targetId: string,
  targetType: 'video' | 'comment'
) => {
  const like = await Like.findOne({
    userId: new mongoose.Types.ObjectId(userId),
    targetId: new mongoose.Types.ObjectId(targetId),
    targetType
  });
  return !!like;
};

export const getUserLikedVideos = async (userId: string) => {
  return await Like.find({
    userId: new mongoose.Types.ObjectId(userId),
    targetType: 'video'
  });
};

export const getUserLikedComments = async (userId: string) => {
  return await Like.find({
    userId: new mongoose.Types.ObjectId(userId),
    targetType: 'comment'
  });
};
