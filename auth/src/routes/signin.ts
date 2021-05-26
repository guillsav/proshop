import { Router } from 'express';
import { AuthController } from '../controllers';
import { loginValidation } from '../middlewares';

const router = Router();

/**
 * @desc    Log users.
 * @route   POST /api/v1/auth/signin
 * @access  Public
 */
router.post('/', loginValidation, AuthController.login);

export default router;
