import { Router } from 'express';
import { getMyAgentProfile, cashIn, cashOut, getMyCommissions } from './agent.controller';
import { authenticate, authorize } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validate';
import { agentTransactionSchema } from '../../types/base.interfase';

const agentRouter = Router();

agentRouter.use(authenticate);
agentRouter.use(authorize(['agent']));

agentRouter.get('/profile', getMyAgentProfile);

agentRouter.post('/cash-in', 
  validateRequest(agentTransactionSchema), 
  cashIn
);

agentRouter.post('/cash-out', 
  validateRequest(agentTransactionSchema), 
  cashOut
);

agentRouter.get('/commissions', getMyCommissions);

export default agentRouter;
