import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

interface JwtPayload {
  id?: string;
  _id?: string;
  iat?: number;
  exp?: number;
}

export const protect = (req: Request & { userId?: string }, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Accept both id and _id from token
    req.userId = decoded.id || decoded._id;

    if (!req.userId) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    next();
  } catch (err) {
    return res.status(401).json({
      message: 'Not authorized',
      error: (err as Error).message,
    });
  }
};
