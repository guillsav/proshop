import { NextFunction, Request, Response, Router } from 'express';
import reviewsController from '../../controllers/reviews.controller';
import { asyncHandler } from '../../middlewares';

const router = Router();

router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    reviewsController.delete(req, res, next)
  )
);

export default router;
