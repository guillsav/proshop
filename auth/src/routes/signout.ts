import { Router } from 'express';
import { AuthController } from '../controllers';
import { asyncHandler, registerValidation } from '../middlewares';

const router = Router();

/**
 * @desc    Logout users.
 * @route   POST /api/v1/auth/signout
 * @access  Public
 */
router.post('/', registerValidation, asyncHandler(AuthController.logout));

export default router;
