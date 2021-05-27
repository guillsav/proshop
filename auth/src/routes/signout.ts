import { Request, Response, Router } from 'express';
import { AuthController } from '../controllers';
import { asyncHandler } from '../middlewares';

const router = Router();

/**
 * @desc    Logout users.
 * @route   POST /api/v1/auth/signout
 * @access  Public
 */
router.post(
  '/',
  asyncHandler((req: Request, res: Response) => AuthController.logout(req, res))
);

export default router;
