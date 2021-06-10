import { NextFunction, Request, Response } from 'express';
import * as Yup from 'yup';
import { validate } from '../helpers';

export const createOrderValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object().shape({
    products: Yup.array().of(
      Yup.object().shape({
        id: Yup.string().trim().min(3).max(128).required(),
        name: Yup.string().trim().min(3).max(128).required(),
        brand: Yup.string().trim().min(3).max(128).required(),
        category: Yup.string().trim().min(3).max(128).required(),
        description: Yup.string().trim().max(500),
        price: Yup.number().default(0).required(),
        countInStock: Yup.number().default(0).required()
      })
    ),
    price: Yup.number().default(0).required(),
    status: Yup.string().trim().min(3).max(128).required()
  });

  return await validate(schema, req.body, req, next);
};

export const updateOrderValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object().shape({
    products: Yup.array().of(
      Yup.object().shape({
        name: Yup.string().trim().min(3).max(128),
        brand: Yup.string().trim().min(3).max(128),
        category: Yup.string().trim().min(3).max(128),
        description: Yup.string().trim().max(500),
        price: Yup.number().default(0),
        countInStock: Yup.number().default(0)
      })
    ),
    price: Yup.number().default(0),
    status: Yup.string().trim().min(3).max(128)
  });

  return await validate(schema, req.body, req, next);
};
