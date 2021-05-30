import { Router } from 'express';
import swaggerUI from 'swagger-ui-express';
import defaultRouter from './default';
import signinRouter from './signin';
import signupRouter from './signup';
import signoutRouter from './signout';
import profileRouter from './profile';

const router = Router();

router.use('/', defaultRouter);
router.use('/signup', signupRouter);
router.use('/signin', signinRouter);
router.use('/profile', profileRouter);
router.use('/signout', signoutRouter);

try {
  const swaggerDoc = require('../../swagger.json');

  router.use(
    '/api-docs',
    swaggerUI.serve,
    swaggerUI.setup(swaggerDoc, { explorer: true })
  );
} catch (error) {
  console.error('Unable to read swagger.json', error);
}

export default router;
