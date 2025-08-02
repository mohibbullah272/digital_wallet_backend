import mongoose, { Schema } from 'mongoose';
import { ITransaction } from '../../types/base.interfase';

const transactionSchema = new Schema<ITransaction>({
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer', 'cash-in', 'cash-out'],
    required: [true, 'Transaction type is required']
  },
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [1, 'Amount must be greater than 0']
  },
  fee: {
    type: Number,
    default: 0
  },
  commission: {
    type: Number,
    default: 0
  },
  senderId: {
    type: String
  },
  receiverId: {
    type: String
  },
  initiatedBy: {
    type: String,
    required: [true, 'Initiator ID is required']
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'reversed'],
    default: 'pending'
  },
  referenceId: {
    type: String,
    required: [true, 'Reference ID is required'],
    unique: true
  },
  description: {
    type: String
  }
}, {
  timestamps: true
});

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

