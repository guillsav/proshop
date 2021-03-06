import { NextFunction, Request, Response, Router } from 'express';
import reviewsController from '../../controllers/reviews.controller';
import { asyncHandler } from '../../middlewares';

const router = Router();

/**
 * @api {DELETE} /api/v1/orders/delete/:id
 * @apiName Delete order
 * @apiGroup Orders
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {} No content.
 */
router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    reviewsController.delete(req, res, next)
  )
);

export default router;
