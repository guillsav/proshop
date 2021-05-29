import { NextFunction, Request, Response, Router } from 'express';
import { ProductsController } from '../../controllers';
import { asyncHandler, updateProductValidation } from '../../middlewares';

const router = Router();

/**
 * @api {PUT} /api/v1/products/update/:id
 * @apiName Update product
 * @apiGroup Products
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Object} Updated product.
 */
router.put(
  '/:id',
  updateProductValidation,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    ProductsController.update(req, res, next, req.body)
  )
);

export default router;
