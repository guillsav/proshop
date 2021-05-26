import { Request, Response, Router } from 'express';
import statusCode from 'http-status-codes';

const { OK } = statusCode;

const router = Router();

/**
 * @desc    Index route.
 * @route   GET /api/v1/auth
 * @access  Public
 */
router.get('/', async (req: Request, res: Response) =>
  res.status(OK).json({
    success: true,
    message: '[AUTH-SERVICE]: up and running... ⚡️⚡️⚡️⚡️⚡️⚡️⚡️'
  })
);

export default router;
