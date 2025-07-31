import { User, IUser } from '../models/user.model';
import jwt from 'jsonwebtoken';

export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<IUser> => {
  const user = await User.create({ username, email, password });
  return user;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<{ token: string; user: IUser } | null> => {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return null;

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET!, { expiresIn: '7d' });

  return { token, user };
};
