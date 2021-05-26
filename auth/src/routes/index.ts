import { Router } from 'express';
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

export default router;
