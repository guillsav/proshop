import { NextFunction, Request, Response, Router } from 'express';
import { ProductsController } from '../../controllers';
import { asyncHandler } from '../../middlewares';

const router = Router();

/**
 * @api {GET} /api/v1/products/all
 * @apiName Fetch all products
 * @apiGroup Products
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Array} List of products.
 */
router.get(
  '/',
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    ProductsController.findAll(req, res, next)
  )
);

export default router;
