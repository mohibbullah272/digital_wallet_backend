import { User } from '../user/user.model';
import { Wallet } from '../wallet/wallet.model';
import { Agent } from '../agent/agent.model';
import { SystemParameters } from './admin.model';
import { walletService } from '../wallet/wallet.service';
import { approveAgent as agentApprove, suspendAgent as agentSuspend } from '../agent/agent.service';

 const getAllUsers = async (page: number = 1, limit: number = 10): Promise<any> => {
  const skip = (page - 1) * limit;
  
  const users = await User.find({ role: { $in: ['user', 'agent'] } })
    .select('-password')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await User.countDocuments({ role: { $in: ['user', 'agent'] } });
  
  return {
    users,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

 const getAllAgents = async (page: number = 1, limit: number = 10): Promise<any> => {
  const skip = (page - 1) * limit;
  
  const agents = await Agent.find()
    .populate({
      path: 'userId',
      select: 'name email  status'
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await Agent.countDocuments();
  
  return {
    agents,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

 const getAllWallets = async (page: number = 1, limit: number = 10): Promise<any> => {
  const skip = (page - 1) * limit;
  
  const wallets = await Wallet.find()
    .populate({
      path: 'userId',
      select: 'name email  role'
    })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await Wallet.countDocuments();
  
  return {
    wallets,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

 const blockUserWallet = async (walletId: string): Promise<any> => {
  return walletService.blockWallet(walletId);
};

 const unblockUserWallet = async (walletId: string): Promise<any> => {
  return walletService.unblockWallet(walletId);
};

 const approveAgent = async (agentId: string): Promise<any> => {
  return agentApprove(agentId);
};

 const suspendAgent = async (agentId: string): Promise<any> => {
  return agentSuspend(agentId);
};

 const getSystemParameters = async (): Promise<any> => {
  let params = await SystemParameters.findOne();
  
  if (!params) {
    // Create default parameters if none exist
    params = new SystemParameters({
      transactionFee: 5,
      userDailyLimit: 50000,
      userMonthlyLimit: 200000,
      agentDailyLimit: 200000,
      agentMonthlyLimit: 1000000,
      minBalance: 10
    });
    
    await params.save();
  }
  
  return params;
};

 const updateSystemParameters = async (updates: any): Promise<any> => {
  const params:any = await SystemParameters.findOne();
  if (!params) {
    throw new Error('System parameters not found');
  }
  
  // Update only the provided fields
  Object.keys(updates).forEach(key => {
    if (params[key] !== undefined) {
      params[key] = updates[key];
    }
  });
  
  await params.save();
  return params;
};

export const adminService ={
    updateSystemParameters,
    getSystemParameters,
    suspendAgent,
    approveAgent,
    unblockUserWallet,
    blockUserWallet,
    getAllWallets,
    getAllAgents,
    getAllUsers
}
