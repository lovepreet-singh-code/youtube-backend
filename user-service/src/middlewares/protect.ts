// middlewares/protect.ts
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  _id: string;
}

export const protect = (
  req: Request & { userId?: string },
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.userId = decoded._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
