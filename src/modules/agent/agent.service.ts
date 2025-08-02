import { Agent } from './agent.model';
import { Wallet } from '../wallet/wallet.model';
import { Transaction } from '../transaction/transaction.model';
import { SystemParameters } from '../admin/admin.model';
import mongoose from 'mongoose';

export const getAgentByUserId = async (userId: string): Promise<any> => {
  const agent = await Agent.findOne({ userId });
  if (!agent) {
    throw new Error('Agent profile not found');
  }
  return agent;
};

export const cashIn = async (agentId: string, userId: string, amount: number, description?: string): Promise<any> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Get agent profile
    const agent = await Agent.findOne({ userId: agentId }).session(session);
    if (!agent) {
      throw new Error('Agent profile not found');
    }
    
    if (agent.approvalStatus !== 'approved') {
      throw new Error('Agent is not approved');
    }
    
    // Get user wallet
    const userWallet = await Wallet.findOne({ userId }).session(session);
    if (!userWallet) {
      throw new Error('User wallet not found');
    }
    
    if (userWallet.status === 'blocked') {
      throw new Error('User wallet is blocked');
    }
    
    // Get system parameters
    const systemParams = await SystemParameters.findOne().session(session);
    if (!systemParams) {
      throw new Error('System parameters not found');
    }
    
    // Calculate commission
    const commission = (amount * agent.commissionRate) / 100;
    
    // Update user wallet
    userWallet.balance += amount;
    await userWallet.save({ session });
    
    // Create transaction record
    const transaction = new Transaction({
      type: 'cash-in',
      amount,
      commission,
      receiverId: userId,
      initiatedBy: agentId,
      status: 'completed',
      referenceId: generateReferenceId(),
      description
    });
    
    await transaction.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    return { userWallet, transaction };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const cashOut = async (agentId: string, userId: string, amount: number, description?: string): Promise<any> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Get agent profile
    const agent = await Agent.findOne({ userId: agentId }).session(session);
    if (!agent) {
      throw new Error('Agent profile not found');
    }
    
    if (agent.approvalStatus !== 'approved') {
      throw new Error('Agent is not approved');
    }
    
    // Get user wallet
    const userWallet = await Wallet.findOne({ userId }).session(session);
    if (!userWallet) {
      throw new Error('User wallet not found');
    }
    
    if (userWallet.status === 'blocked') {
      throw new Error('User wallet is blocked');
    }
    
    // Get system parameters
    const systemParams = await SystemParameters.findOne().session(session);
    if (!systemParams) {
      throw new Error('System parameters not found');
    }
    
    // Check minimum balance
    if (userWallet.balance - amount < systemParams.minBalance) {
      throw new Error(`Insufficient balance. Minimum balance of ৳${systemParams.minBalance} must be maintained`);
    }
    
    // Calculate commission
    const commission = (amount * agent.commissionRate) / 100;
    
    // Update user wallet
    userWallet.balance -= amount;
    await userWallet.save({ session });
    
    // Create transaction record
    const transaction = new Transaction({
      type: 'cash-out',
      amount,
      commission,
      senderId: userId,
      initiatedBy: agentId,
      status: 'completed',
      referenceId: generateReferenceId(),
      description
    });
    
    await transaction.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    return { userWallet, transaction };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

export const getAgentCommissions = async (agentId: string, page: number = 1, limit: number = 10): Promise<any> => {
  const skip = (page - 1) * limit;
  
  const transactions = await Transaction.find({
    initiatedBy: agentId,
    type: { $in: ['cash-in', 'cash-out'] },
    commission: { $gt: 0 }
  })
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);
  
  const total = await Transaction.countDocuments({
    initiatedBy: agentId,
    type: { $in: ['cash-in', 'cash-out'] },
    commission: { $gt: 0 }
  });
  
  // Calculate total commission
  const totalCommission = await Transaction.aggregate([
    {
      $match: {
        initiatedBy: agentId,
        type: { $in: ['cash-in', 'cash-out'] },
        commission: { $gt: 0 }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$commission' }
      }
    }
  ]);
  
  return {
    transactions,
    totalCommission: totalCommission.length > 0 ? totalCommission[0].total : 0,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

export const approveAgent = async (agentId: string): Promise<any> => {
  const agent = await Agent.findById(agentId);
  if (!agent) {
    throw new Error('Agent not found');
  }
  
  agent.approvalStatus = 'approved';
  await agent.save();
  
  return agent;
};

export const suspendAgent = async (agentId: string): Promise<any> => {
  const agent = await Agent.findById(agentId);
  if (!agent) {
    throw new Error('Agent not found');
  }
  
  agent.approvalStatus = 'suspended';
  await agent.save();
  
  return agent;
};

const generateReferenceId = (): string => {
  return 'TXN-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
};
export const agentService ={
    getAgentByUserId,
    cashIn,
    cashOut,
    getAgentCommissions,
    approveAgent,
    suspendAgent
}