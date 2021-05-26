import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';
import { validate } from '../helper';

export const registerValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object().shape({
    name: Yup.string().trim().min(3).max(128).required(),
    email: Yup.string().trim().email().min(6).max(200).required(),
    password: Yup.string().trim().min(6).required(),
    isAdmin: Yup.bool()
  });

  return await validate(schema, req.body, req, next);
};

export const loginValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object().shape({
    email: Yup.string().trim().email().min(6).max(200).required(),
    password: Yup.string().trim().min(6).required()
  });

  return await validate(schema, req.body, req, next);
};
