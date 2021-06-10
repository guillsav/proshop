import * as express from 'express';
import statusCodes from 'http-status-codes';
import { Body, Controller, Delete, Get, Post, Request, Res } from 'tsoa';
import { ReviewAttrs } from '../model';
import { ReviewService } from '../services';
import ApiError from './error.controller';

const { CREATED, OK, NO_CONTENT } = statusCodes;

class ReviewController extends Controller {
  @Post('/')
  public async create(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction,
    @Body() body: ReviewAttrs
  ) {
    try {
      body.user = req.currentUser!.id;
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

  @Delete('/')
  public async delete(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const existingReview = await ReviewService.find(req.params.id);

      if (!existingReview) {
        return next(ApiError.notFound('Review not found'));
      }

      if (existingReview.user !== req.currentUser!.id) {
        return next(
          ApiError.badRequest('Bad request. Review created by different user.')
        );
      }

      await ReviewService.remove(existingReview);

      return res.status(NO_CONTENT).end();
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while deleting the review. Please try again later!"
        )
      );
    }
  }
}

export default new ReviewController();
