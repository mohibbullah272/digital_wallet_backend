import { Response } from 'express';
import { walletService} from './wallet.service';
import { successResponse, errorResponse } from '../../utility/response';
import { AuthRequest, TransactionPayload, TransferPayload } from '../../types/base.interfase';

export const getMyWallet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const wallet = await walletService.getWalletByUserId(userId);
    
    successResponse(res, wallet, 'Wallet retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 404);
  }
};

export const deposit = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { amount, description } = req.body as TransactionPayload;
    
    const { wallet, transaction } = await walletService.depositMoney(userId, amount, description);
    
    successResponse(res, {
      wallet,
      transaction
    }, 'Money deposited successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 400);
  }
};

export const withdraw = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const { amount, description } = req.body as TransactionPayload;
    
    const { wallet, transaction } = await walletService.withdrawMoney(userId, amount, description);
    
    successResponse(res, {
      wallet,
      transaction
    }, 'Money withdrawn successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 400);
  }
};

export const transfer = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const senderId = req.user!.id;
    const { receiverId, amount, description } = req.body as TransferPayload;
    
    if (senderId === receiverId) {
      return errorResponse(res, 'Cannot transfer money to yourself', 400);
    }
    
    const { senderWallet, receiverWallet, transaction } = await walletService.transferMoney(
      senderId,
      receiverId,
      amount,
      description
    );
    
    successResponse(res, {
      senderWallet,
      receiverWallet,
      transaction
    }, 'Money transferred successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 400);
  }
};

