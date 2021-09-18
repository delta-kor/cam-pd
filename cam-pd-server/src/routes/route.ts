import { Router } from 'express';
import StageRouter from './stage.route';
import UserRouter from './user.route';

const router = Router();
router.use('/user', UserRouter);
router.use('/stage', StageRouter);

export default router as Router;
