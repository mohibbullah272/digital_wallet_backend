import mongoose, { Schema } from 'mongoose';
import { ISystemParameters } from '../../types/base.interfase';

const systemParametersSchema = new Schema<ISystemParameters>({
  transactionFee: {
    type: Number,
    required: [true, 'Transaction fee is required'],
    default: 5, // ৳5 fee
    min: [0, 'Transaction fee cannot be negative']
  },
  userDailyLimit: {
    type: Number,
    required: [true, 'User daily limit is required'],
    default: 50000, // ৳50,000
    min: [0, 'User daily limit cannot be negative']
  },
  userMonthlyLimit: {
    type: Number,
    required: [true, 'User monthly limit is required'],
    default: 200000, // ৳200,000
    min: [0, 'User monthly limit cannot be negative']
  },
  agentDailyLimit: {
    type: Number,
    required: [true, 'Agent daily limit is required'],
    default: 200000, // ৳200,000
    min: [0, 'Agent daily limit cannot be negative']
  },
  agentMonthlyLimit: {
    type: Number,
    required: [true, 'Agent monthly limit is required'],
    default: 1000000, // ৳1,000,000
    min: [0, 'Agent monthly limit cannot be negative']
  },
  minBalance: {
    type: Number,
    required: [true, 'Minimum balance is required'],
    default: 10, // ৳10
    min: [0, 'Minimum balance cannot be negative']
  }
}, {
  timestamps: true
});

export const SystemParameters = mongoose.model<ISystemParameters>('SystemParameters', systemParametersSchema);

