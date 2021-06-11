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
    price: Yup.number().min(0).default(0).required(),
    countInStock: Yup.number().min(0).default(0).required()
  });

  return await validate(schema, req.body, req, next);
};

export const updateProductValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object().shape({
    name: Yup.string().trim().min(3).max(128),
    image: Yup.string().trim().min(3).max(255),
    brand: Yup.string().trim().min(3).max(128),
    category: Yup.string().trim().min(3).max(128),
    description: Yup.string().trim().max(500),
    price: Yup.number().min(0).default(0),
    countInStock: Yup.number().min(0).default(0)
  });

  return await validate(schema, req.body, req, next);
};

export const createReviewValidation = async (
  req: Request,
  _: Response,
  next: NextFunction
): Promise<void> => {
  const schema = Yup.object().shape({
    name: Yup.string().trim().min(3).max(128).required(),
    rating: Yup.number().min(0).default(0).required(),
    comment: Yup.string().trim().min(6).max(255).required(),
    product: Yup.string().trim().min(6).max(128).required()
  });

  return await validate(schema, req.body, req, next);
};
