import { Request, Response } from 'express';
import * as userService from '../services/user.service';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const user = await userService.registerUser(username, email, password);
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);

    if (!result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', token: result.token, user: result.user });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

export const getProfile = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const user = await userService.getUserProfile(req.userId!);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateProfile = async (
  req: Request & { userId?: string },
  res: Response
) => {
  try {
    console.log('Incoming userId:', req.userId); // Debug log
    const { username, email, password } = req.body;

    const updatedUser = await userService.updateUserProfile(req.userId!, {
      username,
      email,
      password,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res
      .status(200)
      .json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Profile update failed', error });
  }
};