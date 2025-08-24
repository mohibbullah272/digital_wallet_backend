import { Response } from 'express';
import { transactionService } from './transaction.service';
import { successResponse, errorResponse } from '../../utility/response';
import { AuthRequest } from '../../types/base.interfase';

export const getMyTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const email = req.user!.email
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await transactionService.getUserTransactions(email,userId, page, limit);
    
    successResponse(res, result, 'Transactions retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 500);
  }
};

export const getTransaction = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const transaction = await transactionService.getTransactionById(id);
    
    successResponse(res, transaction, 'Transaction retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 404);
  }
};

export const getAllTransactions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await transactionService.getAllTransactions(page, limit);
    
    successResponse(res, result, 'All transactions retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 500);
  }
};
