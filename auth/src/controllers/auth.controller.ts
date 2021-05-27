import * as express from 'express';
import { Body, Controller, Get, Post, Request, Res } from 'tsoa';
import statusCodes from 'http-status-codes';
import { config } from '../config';
import { UserService } from '../services';
import { Password, Token } from '../helpers';
import { ApiError } from '.';
import { UserAttrs, UserDoc } from '../model';

declare global {
  namespace NodeJS {
    interface Request {
      currentUser: UserDoc | null;
    }
  }
}

const { CREATED, NO_CONTENT, OK } = statusCodes;

class AuthController extends Controller {
  /**
   * @desc    Register new users.
   * @route   POST /api/v1/auth/signup
   * @access  Public
   */
  @Post('/')
  public async register(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction,
    @Body() body: UserAttrs
  ) {
    try {
      const { name, email, password } = body;

      const existingUser = await UserService.findUser(email);

      if (existingUser) {
        return next(ApiError.badRequest('Email already in use'));
      }

      const user = await UserService.signup({ name, email, password });

      const userJwt = Token.generateToken(
        user.id,
        user.email,
        config.jwtKey || process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };

      return res.status(CREATED).json(user);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while registering the user. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc    Log users.
   * @route   POST /api/v1/auth/signin
   * @access  Public
   */
  @Post('/')
  public async login(
    @Request() req: express.Request,
    @Res() res: express.Response,
    next: express.NextFunction,
    @Body() body: { email: string; password: string }
  ) {
    try {
      const { email, password } = body;

      const user = await UserService.findUser(email);

      if (!user) {
        return next(ApiError.notFound('User not found.'));
      }

      const passwordMatched = await Password.compare(user.password, password);

      if (!passwordMatched) {
        return next(ApiError.badRequest('Invalid credentials'));
      }

      const userJwt = Token.generateToken(
        user.id,
        user.email,
        config.jwtKey || process.env.JWT_KEY!
      );

      req.session = { jwt: userJwt };

      return res.status(OK).json(user);
    } catch (error) {
      return next(
        ApiError.internal(
          "We've encounted an error while logging the user. Please try again later!"
        )
      );
    }
  }

  /**
   * @desc    Get current user profile.
   * @route   GET /api/v1/auth/profile
   * @access  Private
   */
  @Get('/')
  public currentUser(
    @Request() req: express.Request,
    @Res() res: express.Response
  ) {
    return res.status(OK).json(req.currentUser || null);
  }

  /**
   * @desc    Logout users.
   * @route   POST /api/v1/auth/signout
   * @access  Public
   */
  @Post('/')
  public async logout(
    @Request() req: express.Request,
    @Res() res: express.Response
  ) {
    req.session = null;
    return res.status(NO_CONTENT).end();
  }
}

export default new AuthController();
