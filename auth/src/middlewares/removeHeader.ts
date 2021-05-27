import { NextFunction, Request, Response } from 'express';

export function removeHeader(_: Request, res: Response, next: NextFunction) {
  res.removeHeader('X-Powered-By');
  return next();
}
