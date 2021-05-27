import { NextFunction, Request, Response, Router } from 'express';
import { AuthController } from '../controllers';
import { asyncHandler, loginValidation } from '../middlewares';

const router = Router();

/**
 * @desc    Log users.
 * @route   POST /api/v1/auth/signin
 * @access  Public
 */
router.post(
  '/',
  loginValidation,
  asyncHandler((req: Request, res: Response, next: NextFunction) =>
    AuthController.login(req, res, next, req.body)
  )
);

export default router;
