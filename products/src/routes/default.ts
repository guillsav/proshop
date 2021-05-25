import { Request, Response, Router } from 'express';

const defaultRouter = Router();

/**
 * @api {GET} /api/v1/
 * @apiName default
 * @apiGroup Products
 * @apiSuccess {String} code HTTP status code from API.
 * @apiSuccess {String} message Message from API.
 */
defaultRouter.get('/', (_: Request, res: Response) =>
  res.status(200).json({
    success: true,
    message: '[PRODUCT-SERVICE]: up and running... ⚡️⚡️⚡️⚡️⚡️⚡️⚡️'
  })
);

export default defaultRouter;
