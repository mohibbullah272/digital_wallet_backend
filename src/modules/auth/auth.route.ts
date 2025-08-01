import { Router } from 'express';
import { register, login, refresh } from './auth.controller';
import { validateRequest } from '../../middlewares/validate';
import { registerSchema, loginSchema } from '../../types/base.interfase';

const authRouter = Router();

authRouter.post('/register', validateRequest(registerSchema), register);
authRouter.post('/login', validateRequest(loginSchema), login);
authRouter.post('/refresh', refresh);

export default authRouter;
