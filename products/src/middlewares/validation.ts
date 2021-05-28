import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';
import { validate } from '../helpers';

export const createProductValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object().shape({
    name: Yup.string().trim().min(3).max(128).required(),
    image: Yup.string().trim().min(3).max(255).required(),
    brand: Yup.string().trim().min(3).max(128).required(),
    category: Yup.string().trim().min(3).max(128).required(),
    description: Yup.string().trim().max(500),
    price: Yup.number().default(0).required(),
    countInStock: Yup.number().default(0).required()
  });

  return await validate(schema, req.body, req, next);
};
