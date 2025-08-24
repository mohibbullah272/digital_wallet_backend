import { Wallet } from './wallet.model';
import { Transaction } from '../transaction/transaction.model';
import { SystemParameters } from '../admin/admin.model';
import mongoose from 'mongoose';

 const getWalletByUserId = async (userId: string): Promise<any> => {
  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw new Error('Wallet not found');
  }
  return wallet;
};

 const depositMoney = async (userId: string, amount: number, description?: string): Promise<any> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Get wallet
    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    
    if (wallet.status === 'blocked') {
      throw new Error('Wallet is blocked');
    }
    
    // Get system parameters
    const systemParams = await SystemParameters.findOne().session(session);
    if (!systemParams) {
      throw new Error('System parameters not found');
    }
    
    // Calculate fee
    const fee = systemParams.transactionFee;
    const netAmount = amount - fee;
    
    // Update wallet balance
    wallet.balance += netAmount;
    await wallet.save({ session });
    
    // Create transaction record
    const transaction = new Transaction({
      type: 'deposit',
      amount,
      fee,
      initiatedBy: userId,
      status: 'completed',
      referenceId: generateReferenceId(),
      description
    });
    
    await transaction.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    return { wallet, transaction };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const withdrawMoney = async (userId: string, amount: number, description?: string): Promise<any> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Get wallet
    const wallet = await Wallet.findOne({ userId }).session(session);
    if (!wallet) {
      throw new Error('Wallet not found');
    }
    
    if (wallet.status === 'blocked') {
      throw new Error('Wallet is blocked');
    }
    
    // Get system parameters
    const systemParams = await SystemParameters.findOne().session(session);
    if (!systemParams) {
      throw new Error('System parameters not found');
    }
    
    // Check minimum balance
    if (wallet.balance - amount < systemParams.minBalance) {
      throw new Error(`Insufficient balance. Minimum balance of ৳${systemParams.minBalance} must be maintained`);
    }
    
    // Calculate fee
    const fee = systemParams.transactionFee;
    const totalDeduction = amount + fee;
    
    // Check balance
    if (wallet.balance < totalDeduction) {
      throw new Error('Insufficient balance');
    }
    
    // Update wallet balance
    wallet.balance -= totalDeduction;
    await wallet.save({ session });
    
    // Create transaction record
    const transaction = new Transaction({
      type: 'withdrawal',
      amount,
      fee,
      initiatedBy: userId,
      status: 'completed',
      referenceId: generateReferenceId(),
      description
    });
    
    await transaction.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    return { wallet, transaction };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

 const transferMoney = async (senderId: string, email: string, amount: number, description?: string): Promise<any> => {
  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    // Get sender wallet
    const senderWallet = await Wallet.findOne({ email: senderId }).session(session);
    if (!senderWallet) {
      throw new Error('Sender wallet not found');
    }
    
    if (senderWallet.status === 'blocked') {
      throw new Error('Sender wallet is blocked');
    }
    
    // Get receiver wallet
    const receiverWallet = await Wallet.findOne({ email: email }).session(session);
    if (!receiverWallet) {
      throw new Error('Receiver wallet not found');
    }
    
    if (receiverWallet.status === 'blocked') {
      throw new Error('Receiver wallet is blocked');
    }
    
    // Get system parameters
    const systemParams = await SystemParameters.findOne().session(session);
    if (!systemParams) {
      throw new Error('System parameters not found');
    }
    
    // Check minimum balance
    if (senderWallet.balance - amount < systemParams.minBalance) {
      throw new Error(`Insufficient balance. Minimum balance of ৳${systemParams.minBalance} must be maintained`);
    }
    
    // Calculate fee
    const fee = systemParams.transactionFee;
    const totalDeduction = amount + fee;
    
    // Check balance
    if (senderWallet.balance < totalDeduction) {
      throw new Error('Insufficient balance');
    }
    
    // Update sender wallet
    senderWallet.balance -= totalDeduction;
    await senderWallet.save({ session });
    
    // Update receiver wallet
    receiverWallet.balance += amount;
    await receiverWallet.save({ session });
    
    // Create transaction record
    const transaction = new Transaction({
      type: 'transfer',
      amount,
      fee,
      senderId,
      email,
      initiatedBy: senderId,
      status: 'completed',
      referenceId: generateReferenceId(),
      description
    });
    
    await transaction.save({ session });
    
    await session.commitTransaction();
    session.endSession();
    
    return { senderWallet, receiverWallet, transaction };
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const blockWallet = async (walletId: string): Promise<any> => {
  const wallet = await Wallet.findById(walletId);
  if (!wallet) {
    throw new Error('Wallet not found');
  }
  
  wallet.status = 'blocked';
  await wallet.save();
  
  return wallet;
};

 const unblockWallet = async (walletId: string): Promise<any> => {
  const wallet = await Wallet.findById(walletId);
  if (!wallet) {
    throw new Error('Wallet not found');
  }
  
  wallet.status = 'active';
  await wallet.save();
  
  return wallet;
};

const generateReferenceId = (): string => {
  return 'TXN-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
};

export const walletService ={
blockWallet,
unblockWallet,
transferMoney,
withdrawMoney,
depositMoney,
getWalletByUserId
}