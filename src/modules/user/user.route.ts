import { Router } from 'express';
import { getProfile, updateProfile } from './user.controller';
import { authenticate } from '../../middlewares/auth';

const userRouter = Router();

userRouter.use(authenticate);

userRouter.get('/profile', getProfile);
userRouter.put('/profile', updateProfile);

export default userRouter;
