import { NextFunction, Request, Response, Router } from 'express';
import { ProductsController } from '../../controllers';
import { asyncHandler } from '../../middlewares';

const router = Router();

/**
 * @api {GET} /api/v1/products/show/:id
 * @apiName View product
 * @apiGroup Products
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Object} Found product.
 */
router.get(
  '/:id',
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    ProductsController.findById(req, res, next)
  )
);

export default router;
