import { Request, Response, Router } from 'express';

const router = Router();

/**
 * @api {GET} /api/v1/payments
 * @apiName Default
 * @apiGroup Payments
 * @apiSuccess {Number} code HTTP status code from API.
 * @apiSuccess {Boolean} returns success true.
 * @apiSuccess {String} message Message from API.
 */
router.get('/', (_: Request, res: Response) =>
  res.status(200).json({
    success: true,
    message: '[PAYMENTS-SERVICE]: up and running... ⚡️⚡️⚡️⚡️⚡️⚡️⚡️'
  })
);

export default router;
