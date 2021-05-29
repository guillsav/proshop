import { NextFunction, Request, Response, Router } from 'express';
import { ProductsController } from '../../controllers';
import { asyncHandler } from '../../middlewares';

const router = Router();

/**
 * @api {DELETE} /api/v1/products/delete/:id
 * @apiName Delete product
 * @apiGroup Products
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {} No content.
 */
router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    ProductsController.delete(req, res, next)
  )
);

export default router;
