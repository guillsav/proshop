import { NextFunction, Request, Response, Router } from 'express';
import { ProductsController } from '../controllers';
import { asyncHandler } from '../middlewares';

const router = Router();

router.delete(
  '/:id',
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    ProductsController.delete(req, res, next)
  )
);

export default router;
