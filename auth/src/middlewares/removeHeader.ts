import { NextFunction, Request, Response } from 'express';

export function removeHeader(req: Request, res: Response, next: NextFunction) {
  res.removeHeader('X-Powered-By');
  return next();
}
