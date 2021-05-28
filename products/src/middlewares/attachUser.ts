import { NextFunction, Request, Response } from 'express';
import { config } from '../config';
import { Token } from '../helpers';

interface UserPayload {
  id: string;
  email: string;
  isAdmin: boolean;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const attachUser = (req: Request, _: Response, next: NextFunction) => {
  if (!req.session?.jwt) {
    return next();
  }

  const key = config.jwtKey;

  try {
    const payload = Token.validateToken(req.session.jwt, key) as UserPayload;
    req.currentUser = payload;
  } catch (error) {}

  next();
};
