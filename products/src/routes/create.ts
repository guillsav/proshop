import { NextFunction, Request, Response, Router } from 'express';
import { asyncHandler, createProductValidation } from '../middlewares';
import { ProductsController } from '../controllers';

const router = Router();

/**
 * @api {POST} /api/v1/products/create
 * @apiName Create product
 * @apiGroup Products
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Object} Created product.
 */
router.post(
  '/',
  createProductValidation,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    ProductsController.create(req, res, next, req.body)
  )
);

export default router;
