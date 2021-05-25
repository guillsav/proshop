import { Request, Response, Router } from 'express';
import statusCode from 'http-status-codes';

const { OK } = statusCode;

const defaultRouter = Router();

defaultRouter.get('/', async (req: Request, res: Response) =>
  res.status(OK).json({
    success: true,
    message: '[AUTH-SERVICE]: up and running... ⚡️⚡️⚡️⚡️⚡️⚡️⚡️'
  })
);

export default defaultRouter;
