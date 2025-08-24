import { Transaction } from './transaction.model';

const getUserTransactions = async (
  email: string,
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<any> => {
  const skip = (page - 1) * limit;

  // Query condition for both cases
  const conditions = [
    // For transfer (email-based identifiers)
    { $and: [{ type: "transfer" }, { initiatedBy: email }] },
    { $and: [{ type: "transfer" }, { senderId: email }] },
    { $and: [{ type: "transfer" }, { receiverId: email }] },

    // For other types (id-based identifiers)
    { $and: [{ type: { $ne: "transfer" } }, { initiatedBy: userId }] },
    { $and: [{ type: { $ne: "transfer" } }, { senderId: userId }] },
    { $and: [{ type: { $ne: "transfer" } }, { receiverId: userId }] },
  ];

  const transactions = await Transaction.find({ $or: conditions })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Transaction.countDocuments({ $or: conditions });

  return {
    transactions,
    pagination: {
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    },
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