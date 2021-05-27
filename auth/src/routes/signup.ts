import { NextFunction, Request, Response, Router } from 'express';
import { AuthController } from '../controllers';
import { asyncHandler, registerValidation } from '../middlewares';

const router = Router();

/**
 * @desc    Register new users.
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
router.post(
  '/',
  registerValidation,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    AuthController.register(req, res, next, req.body)
  )
);

export default router;
