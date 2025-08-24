import { Router } from 'express';
import { getMyWallet, deposit, withdraw, transfer, } from './wallet.controller';
import { authenticate } from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validate';
import { transactionSchema, transferSchema } from '../../types/base.interfase';

const WalletRouter = Router();

WalletRouter.use(authenticate);

WalletRouter.get('/me', getMyWallet);

WalletRouter.post('/deposit', 
  validateRequest(transactionSchema), 
  deposit
);

WalletRouter.post('/withdraw', 
  validateRequest(transactionSchema), 
  withdraw
);

WalletRouter.post('/transfer', 
  validateRequest(transferSchema), 
  transfer
);

export default WalletRouter;

