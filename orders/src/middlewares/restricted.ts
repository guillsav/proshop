import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../controllers';

export const restricted = (req: Request, _: Response, next: NextFunction) => {
  if (!req.currentUser) {
    return next(ApiError.unauthorized('Invalid credentials'));
  }

  const user = req.currentUser;

  if (!user?.isAdmin) {
    return next(ApiError.forbidden('Forbidden access. Admin role not found.'));
  }

  return next();
};
