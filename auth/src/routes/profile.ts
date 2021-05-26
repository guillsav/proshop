import { Request, Response, Router } from 'express';
import statucCodes from 'http-status-codes';
import { attachUser } from '../middlewares/attachUser';

const { OK } = statucCodes;

const router = Router();

router.get('/', attachUser, (req: Request, res: Response) => {
  return res.status(OK).json({ currentUser: req.currentUser || null });
});

export default router;
