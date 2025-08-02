import { Router } from 'express';
import { 
  getAllUsers, 
  getAllAgents, 
  getAllWallets, 
  blockUserWallet,
  unblockUserWallet,
  approveAgent,
  suspendAgent,
  getSystemParameters,
  updateSystemParameters
} from './admin.controller';
import { authenticate, authorize } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validate';
import { systemParamsSchema } from '../../types/base.interfase';

const adminRouter = Router();

adminRouter.use(authenticate);
adminRouter.use(authorize(['admin']));

adminRouter.get('/users', getAllUsers);
adminRouter.get('/agents', getAllAgents);
adminRouter.get('/wallets', getAllWallets);

adminRouter.patch('/wallets/block/:walletId', blockUserWallet);
adminRouter.patch('/wallets/unblock/:walletId', unblockUserWallet);

adminRouter.patch('/agents/approve/:agentId', approveAgent);
adminRouter.patch('/agents/suspend/:agentId', suspendAgent);

adminRouter.get('/system-parameters', getSystemParameters);
adminRouter.put('/system-parameters', 
  validateRequest(systemParamsSchema), 
  updateSystemParameters
);

export default adminRouter;
