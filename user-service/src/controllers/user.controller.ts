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

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.body.token;
    if (!token) {
      return res.status(400).json({ message: 'Token is required for logout' });
    }
    await userService.logoutUser(token);
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed', error });
  }
};

export const subscribe = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const result = await userService.subscribeUser(req.userId!, req.params.id);
    res.status(200).json({ message: result });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    res.status(400).json({ message: errorMessage });
  }
};

export const unsubscribe = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const result = await userService.unsubscribeUser(req.userId!, req.params.id);
    res.status(200).json({ message: result });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    res.status(400).json({ message: errorMessage });
  }
};

export const getAllSubscribers = async (req: Request, res: Response) => {
  try {
    const subscribers = await userService.getSubscribers(req.params.id);
    res.status(200).json({ count: subscribers.length, subscribers });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get subscribers', error });
  }
};

export const getSubscribed = async (req: Request & { userId?: string }, res: Response) => {
  try {
    const subscriptions = await userService.getSubscribedChannels(req.userId!);
    res.status(200).json({ subscriptions });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get subscriptions', error });
  }
};
