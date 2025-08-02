import { Transaction } from './transaction.model';

 const getUserTransactions = async (userId: string, page: number = 1, limit: number = 10): Promise<any> => {
  const skip = (page - 1) * limit;
  
  const transactions = await Transaction.find({
    $or: [
      { initiatedBy: userId },
      { senderId: userId },
      { receiverId: userId }
    ]
  })
  .sort({ createdAt: -1 })
  .skip(skip)
  .limit(limit);
  
  const total = await Transaction.countDocuments({
    $or: [
      { initiatedBy: userId },
      { senderId: userId },
      { receiverId: userId }
    ]
  });
  
  return {
    transactions,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};

 const getTransactionById = async (transactionId: string): Promise<any> => {
  const transaction = await Transaction.findById(transactionId);
  if (!transaction) {
    throw new Error('Transaction not found');
  }
  return transaction;
};

 const getAllTransactions = async (page: number = 1, limit: number = 10): Promise<any> => {
  const skip = (page - 1) * limit;
  
  const transactions = await Transaction.find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
    
  const total = await Transaction.countDocuments();
  
  return {
    transactions,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit)
    }
  };
};


export const transactionService ={
    getUserTransactions,
    getTransactionById,
    getAllTransactions
}