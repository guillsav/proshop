import { Request, Response, Router } from 'express';
import statusCodes from 'http-status-codes';

const { OK } = statusCodes;

const router = Router();

router.get('/', (_: Request, res: Response) => {
  res.status(OK).json({
    success: true,
    message: '[ORDER-SERVICE]: up and running... ⚡️⚡️⚡️⚡️⚡️⚡️⚡️'
  });
});

export default router;
