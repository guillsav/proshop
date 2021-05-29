import { NextFunction, Request, Response, Router } from 'express';
import { ProductsController } from '../controllers';
import { asyncHandler } from '../middlewares';

const router = Router();

router.get(
  '/:id',
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    ProductsController.findById(req, res, next)
  )
);

export default router;
