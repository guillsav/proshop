import * as express from 'express';
import statusCodes from 'http-status-codes';
import { Body, Controller, Delete, Get, Post, Put, Request, Res } from 'tsoa';
import { ApiError } from '.';
import { ProductService } from '../services';
import { ProductAttrs } from '../model';
import { UpdateProductAttrs, UserDoc } from '../lib';
import {
  broker,
  ProductCreatedPublisher,
  ProductDeletedPublisher,
  ProductUpdatedPublisher
} from '../events';

const { CREATED, NO_CONTENT, OK } = statusCodes;

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

      // Publish event to rabbitmq
      await new ProductCreatedPublisher((await broker).ch).publish({
        id: product.id,
        ...product
      });

      return res.status(CREATED).json(product);
    } catch (error) {
      console.log(error);
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

  @Get('/')
  public async findById(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const product = await ProductService.find(req.params.id);

      if (!product) {
        return next(ApiError.notFound('Product not found'));
      }

      return res.status(OK).json(product);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while fetching the product. Please try again later!"
        )
      );
    }
  }

  @Put('/')
  public async update(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction,
    @Body() body: UpdateProductAttrs
  ) {
    try {
      const existingProduct = await ProductService.find(req.params.id);

      if (!existingProduct) {
        return next(ApiError.notFound('Product not found.'));
      }

      if (existingProduct.userId !== req.currentUser!.id) {
        return next(ApiError.unauthorized('Invalid credentials'));
      }

      const product = await ProductService.update(body, existingProduct);

      // Publish event to rabbitmq
      await new ProductUpdatedPublisher((await broker).ch).publish({
        id: product.id,
        ...product
      });

      return res.status(OK).json(product);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while updating the product. Please try again later!"
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
      const existingProduct = await ProductService.find(req.params.id);

      if (!existingProduct) {
        return next(ApiError.notFound('Product not found'));
      }

      if (existingProduct.userId !== req.currentUser!.id) {
        return next(ApiError.unauthorized('Invalid credentials'));
      }

      await ProductService.remove(existingProduct);

      // Publish event to rabbitmq
      await new ProductDeletedPublisher((await broker).ch).publish(
        existingProduct.id
      );

      return res.status(NO_CONTENT).end();
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while deleting the product. Please try again later!"
        )
      );
    }
  }
}

export default new ProductController();
