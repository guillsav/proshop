import * as express from 'express';
import statusCodes from 'http-status-codes';
import { Body, Controller, Get, Post, Request, Res } from 'tsoa';
import { ReviewAttrs } from '../model';
import { ReviewService } from '../services';
import ApiError from './error.controller';

const { CREATED, OK } = statusCodes;

class ReviewController extends Controller {
  @Post('/')
  public async create(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction,
    @Body() body: ReviewAttrs
  ) {
    try {
      const review = await ReviewService.add(body);
      return res.status(CREATED).json(review);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while adding the review. Please try again later!"
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
      const reviews = await ReviewService.fetch();
      return res.status(OK).send(reviews);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while fetching the reviews. Please try again later!"
        )
      );
    }
  }
}

export default new ReviewController();
