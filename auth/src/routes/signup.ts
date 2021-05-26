import { Router } from 'express';
import { AuthController } from '../controllers';
import { registerValidation } from '../middlewares';

const router = Router();

/**
 * @desc    Register new users.
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
router.post('/', registerValidation, AuthController.register);

export default router;
