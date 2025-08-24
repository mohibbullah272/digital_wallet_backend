import { Response } from 'express';
import { agentService } from './agent.service';
import { successResponse, errorResponse } from '../../utility/response';
import { AuthRequest, AgentTransactionPayload } from '../../types/base.interfase';

export const getMyAgentProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const agent = await agentService.getAgentByUserId(userId);
    
    successResponse(res, agent, 'Agent profile retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 404);
  }
};

export const cashIn = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const agentId = req.user!.id;
    const { email, amount, description } = req.body as AgentTransactionPayload;
    
    const { userWallet, transaction } = await agentService.cashIn(agentId, email, amount, description);
    
    successResponse(res, {
      userWallet,
      transaction
    }, 'Cash-in successful');
  } catch (error:any) {
    errorResponse(res, error.message, 400);
  }
};

export const cashOut = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const agentId = req.user!.id;
    const { email, amount, description } = req.body as AgentTransactionPayload;
    
    const { userWallet, transaction } = await agentService.cashOut(agentId, email, amount, description);
    
    successResponse(res, {
      userWallet,
      transaction
    }, 'Cash-out successful');
  } catch (error:any) {
    errorResponse(res, error.message, 400);
  }
};

export const getMyCommissions = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const agentId = req.user!.id;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    
    const result = await agentService.getAgentCommissions(agentId, page, limit);
    
    successResponse(res, result, 'Commissions retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 500);
  }
};
