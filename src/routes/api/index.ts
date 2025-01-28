import {Router} from 'express';
import { userRouter } from './userRoutes';
import { thoughtRouter} from './thoughtsRoutes';

const router = Router();

router.use('/user',userRouter);
router.use('/thought',thoughtRouter);

export default router;