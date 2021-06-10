import * as express from 'express';
import statuscodes from 'http-status-codes';
import { Body, Controller, Delete, Get, Post, Request, Res } from 'tsoa';
import { ApiError } from '.';
import { OrderService } from '../services';
import { OrderAttrs } from '../model';
import { broker, OrderCreatedPublisher } from '../events';

const { CREATED, NO_CONTENT, OK } = statuscodes;

class OrderController extends Controller {
  @Post('/')
  public async create(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction,
    @Body() body: OrderAttrs
  ) {
    try {
      const order = await OrderService.add(body, req.currentUser!.id);

      // Publish event to broker
      await new OrderCreatedPublisher((await broker).ch).publish({
        id: order.id,
        status: order.status,
        userId: order.userId,
        products: order.products,
        price: order.price
      });

      return res.status(CREATED).json(order);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while creating the order. Please try again later!"
        )
      );
    }
  }

  @Get('/')
  public async findAll(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const orders = await OrderService.fetch(req.currentUser!.id);

      return res.status(OK).json(orders);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while looking for the orders. Please try again later!"
        )
      );
    }
  }

  @Get('/')
  public async findById(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const order = await OrderService.find(req.params.id);

      if (!order) {
        return next(ApiError.notFound('Order not found.'));
      }

      if (order.userId !== req.currentUser!.id) {
        return next(ApiError.unauthorized('Invalid credentials'));
      }

      res.status(OK).json(order);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while looking for the order. Please try again later!"
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
      const existingOrder = await OrderService.find(req.params.id);

      if (!existingOrder) {
        return next(ApiError.notFound('Order not found'));
      }

      if (existingOrder.userId !== req.currentUser!.id) {
        return next(ApiError.badRequest('Invalid credentials.'));
      }

      await OrderService.remove(existingOrder);

      return res.status(NO_CONTENT).end();
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while deleting the order. Please try again later!"
        )
      );
    }
  }
}

export default new OrderController();
