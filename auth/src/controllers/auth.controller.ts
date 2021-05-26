import { NextFunction, Request, Response } from 'express';
import statusCodes from 'http-status-codes';
import { config } from '../config';
import { UserService } from '../services';
import { Password, Token } from '../helper';
import { ApiError } from '.';
import { UserDoc } from '../model';

const { CREATED, NO_CONTENT, OK } = statusCodes;

class AuthController {
  /**
   * @desc    Register new users.
   * @route   POST /api/v1/auth/signup
   * @access  Public
   */
  async register(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<UserDoc, Record<string, UserDoc>>> {
    try {
      const {
        name,
        email,
        password
      }: { name: string; email: string; password: string } = req.body;

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
  async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response<UserDoc, Record<string, UserDoc>>> {
    try {
      const { email, password }: { email: string; password: string } = req.body;

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
   * @desc    Logout users.
   * @route   POST /api/v1/auth/signout
   * @access  Public
   */
  async logout(req: Request, res: Response): Promise<void> {
    req.session = null;
    return res.status(NO_CONTENT).end();
  }
}

export default new AuthController();
