import * as express from 'express';
import statusCodes from 'http-status-codes';
import { Body, Controller, Get, Post, Request, Res } from 'tsoa';
import { ApiError } from '.';
import { ProductService } from '../services';
import { ProductAttrs } from '../model';

const { CREATED, OK } = statusCodes;

class ProductController extends Controller {
  @Post('/')
  public async create(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction,
    @Body() body: ProductAttrs
  ) {
    try {
      const product = await ProductService.add(body, req.currentUser!.id);

      return res.status(CREATED).json(product);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while creating the product. Please try again later!"
        )
      );
    }
  }

  @Get('/')
  public async findAll(
    @Request() _: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const products = await ProductService.fetch();
      return res.status(OK).json(products);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while fetching products. Please try again later!"
        )
      );
    }
  }
}

export default new ProductController();
