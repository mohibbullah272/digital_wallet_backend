import { Response } from 'express';
import { 
adminService
} from './admin.service';
import { successResponse, errorResponse } from '../../utility/response';
import { AuthRequest, SystemParamsPayload } from '../../types/base.interfase';

export const getAllUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await adminService.getAllUsers(page, limit);
    
    successResponse(res, result, 'Users retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 500);
  }
};

export const getAllAgents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await adminService.getAllAgents(page, limit);
    
    successResponse(res, result, 'Agents retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 500);
  }
};

export const getAllWallets = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await adminService.getAllWallets(page, limit);
    
    successResponse(res, result, 'Wallets retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 500);
  }
};

export const blockUserWallet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { walletId } = req.params;
    const wallet = await adminService.blockUserWallet(walletId);
    
    successResponse(res, wallet, 'Wallet blocked successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 404);
  }
};

export const unblockUserWallet = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { walletId } = req.params;
    const wallet = await adminService.unblockUserWallet(walletId);
    
    successResponse(res, wallet, 'Wallet unblocked successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 404);
  }
};

export const approveAgent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { agentId } = req.params;
    const agent = await adminService.approveAgent(agentId);
    
    successResponse(res, agent, 'Agent approved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 404);
  }
};

export const suspendAgent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { agentId } = req.params;
    const agent = await adminService.suspendAgent(agentId);
    
    successResponse(res, agent, 'Agent suspended successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 404);
  }
};

export const getSystemParameters = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const params = await adminService.getSystemParameters();
    
    successResponse(res, params, 'System parameters retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 500);
  }
};

export const updateSystemParameters = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updates = req.body as SystemParamsPayload;
    const params = await adminService.updateSystemParameters(updates);
    
    successResponse(res, params, 'System parameters updated successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 400);
  }
};

