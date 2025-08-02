import { Router } from 'express';
import { getMyTransactions, getTransaction, getAllTransactions } from './transaction.controller';
import { authenticate, authorize } from '../../middlewares/auth';

const transactionsRouter = Router();

transactionsRouter.use(authenticate);

transactionsRouter.get('/me', getMyTransactions);
transactionsRouter.get('/:id', getTransaction);

// Admin only
transactionsRouter.get('/all', 
  authorize(['admin']), 
  getAllTransactions
);

export default transactionsRouter;

