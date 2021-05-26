import { NextFunction, Request } from 'express';
import * as Yup from 'yup';
import { ApiError } from '..';

export async function validate(
  schema: Yup.ObjectSchema<any>,
  body: any,
  req: Request,
  next: NextFunction
) {
  try {
    const result = await schema.validate(body);
    if (result) {
      req.body = result;
      return next();
    }
  } catch ({ errors }) {
    return next(ApiError.validationError(errors[0]));
  }
}
