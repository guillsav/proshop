import { NextFunction, Request, Response, Router } from 'express';
import { ProductsController } from '../controllers';
import { asyncHandler, updateProductValidation } from '../middlewares';

const router = Router();

router.put(
  '/:id',
  updateProductValidation,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    ProductsController.update(req, res, next, req.body)
  )
);

export default router;
