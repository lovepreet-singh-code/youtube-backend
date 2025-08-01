import { User, IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';
import redis from '../config/redis';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  return await User.create({ username, email, password });
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: IUser } | null> => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;

  const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '1d' });

  return { token, user };
};

export const getUserProfile = async (userId: string): Promise<IUser | null> => {
  return await User.findById(userId).select('-password');
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<IUser>
): Promise<IUser | null> => {
  const user = await User.findById(userId);
  if (!user) return null;

  if (updates.username) user.username = updates.username;
  if (updates.email) user.email = updates.email;
  if (updates.password) user.password = updates.password;

  await user.save();
  return user;
};

export const logoutUser = async (token: string): Promise<boolean> => {
  const decoded = jwt.decode(token) as { exp?: number };

  if (decoded?.exp) {
    const expiryInSec = decoded.exp - Math.floor(Date.now() / 1000);
    await redis.setex(`bl_${token}`, expiryInSec, 'blacklisted');
  }

  return true;
};

export const subscribeUser = async (userId: string, targetId: string): Promise<string> => {
  if (userId === targetId) throw new Error("Cannot subscribe to yourself");

  const user = await User.findById(userId);
  const target = await User.findById(targetId);

  if (!user || !target) throw new Error("User not found");

  if (user.subscribedTo.includes(target._id as any)) throw new Error("Already subscribed");

  user.subscribedTo.push(target._id as import('mongoose').Types.ObjectId);
  target.subscribers += 1;

  await user.save();
  await target.save();

  return "Subscribed successfully";
};

export const unsubscribeUser = async (userId: string, targetId: string): Promise<string> => {
  const user = await User.findById(userId);
  const target = await User.findById(targetId);

  if (!user || !target) throw new Error("User not found");

  if (!user.subscribedTo.includes(target._id as any)) throw new Error("Not subscribed");

  user.subscribedTo = user.subscribedTo.filter(id => id.toString() !== targetId);
  target.subscribers -= 1;

  await user.save();
  await target.save();

  return "Unsubscribed successfully";
};

export const getSubscribers = async (targetId: string) => {
  const subscribers = await User.find({ subscribedTo: targetId }).select('username email');
  return subscribers;
};

export const getSubscribedChannels = async (userId: string) => {
  const user = await User.findById(userId).populate('subscribedTo', 'username email');
  return user?.subscribedTo || [];
};