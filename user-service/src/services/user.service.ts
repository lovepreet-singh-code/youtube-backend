import { User, IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';

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
