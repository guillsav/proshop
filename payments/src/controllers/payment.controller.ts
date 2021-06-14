import express from 'express';
import { Body, Controller, Delete, Get, Post, Request, Res } from 'tsoa';
import statusCodes from 'http-status-codes';
import { ApiError } from '.';
import { CreatePaymenAtrrs, OrderStatus, stripe } from '../lib';
import { OrderService, PaymentService } from '../service';
import { PaymentCreatedPublisher } from '../events';

const { CREATED, NO_CONTENT, OK } = statusCodes;

class PaymentController extends Controller {
  @Post('/')
  public async create(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction,
    @Body() body: CreatePaymenAtrrs
  ) {
    try {
      const { orderId, token } = body;
      const order = await OrderService.findById(orderId);

      if (!order) {
        return next(ApiError.notFound('Order not found'));
      }

      if (order.userId !== req.currentUser!.id) {
        return next(ApiError.unauthorized('Invalid credentials'));
      }

      if (order.status === OrderStatus.CANCELLED) {
        return next(
          ApiError.badRequest('Cannot process payment on cancelled orders')
        );
      }

      if (order.status === OrderStatus.COMPLETE) {
        return next(
          ApiError.badRequest('Cannot process payment on completed orders')
        );
      }

      // Creating a stripe charge.
      const charge = await stripe.charges.create({
        currency: 'USD',
        amount: order.price * 100,
        source: token
      });

      // Adding payment to DB
      const payment = await PaymentService.add({
        orderId,
        stripeId: charge.id,
        userId: req.currentUser!.id
      });

      // Updating order status in DB.
      await OrderService.update(order, { status: OrderStatus.COMPLETE });

      // Publish message to broker
      await PaymentCreatedPublisher.publish({
        orderId,
        version: order.version
      });

      res.status(CREATED).json(payment);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while proccessing the payment. Please try again later!"
        )
      );
    }
  }

  @Get('/')
  public async find(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const payment = await PaymentService.find(req.params.id);

      if (!payment) {
        return next(ApiError.notFound('Payment not found'));
      }

      if (payment.userId !== req.currentUser!.id) {
        return next(ApiError.unauthorized('Invalid credentials'));
      }

      res.status(OK).json(payment);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while retrieving your payment. Please try again later!"
        )
      );
    }
  }

  @Delete('/')
  public async delete(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const payment = await PaymentService.find(req.params.id);

      if (!payment) {
        return next(ApiError.notFound('Payment not found'));
      }

      if (payment.userId !== req.currentUser!.id) {
        return next(ApiError.unauthorized('Invalid credentials'));
      }

      await PaymentService.remove(payment);

      res.status(NO_CONTENT).end();
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while deleting your payment. Please try again later!"
        )
      );
    }
  }
}

export default new PaymentController();
