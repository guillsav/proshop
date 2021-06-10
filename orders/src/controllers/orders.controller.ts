import * as express from 'express';
import statuscodes from 'http-status-codes';
import { Body, Controller, Delete, Get, Post, Put, Request, Res } from 'tsoa';
import { ApiError } from '.';
import { OrderService } from '../services';
import { OrderAttrs } from '../model';
import { broker, OrderCreatedPublisher } from '../events';

const { CREATED } = statuscodes;

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

      res.status(CREATED).json(order);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while creating the order. Please try again later!"
        )
      );
    }
  }
}

export default new OrderController();
