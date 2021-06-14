import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';
import { validate } from '../helpers';

export const createPaymentValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object().shape({
    orderId: Yup.string().trim().min(3).max(128).required(),
    token: Yup.string().trim().min(3).max(255).required()
  });

  return await validate(schema, req.body, req, next);
};

export const updateOrderValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object().shape({
    orderId: Yup.string().trim().min(3).max(128),
    token: Yup.string().trim().min(3).max(255)
  });

  return await validate(schema, req.body, req, next);
};
