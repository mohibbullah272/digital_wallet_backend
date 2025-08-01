import mongoose, { Schema } from 'mongoose';
import { IWallet } from '../../types/base.interfase';

const walletSchema = new Schema<IWallet>({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    unique: true
  },
  balance: {
    type: Number,
    required: [true, 'Balance is required'],
    default: 50, // Initial balance of ৳50
    min: [0, 'Balance cannot be negative']
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active'
  }
}, {
  timestamps: true
});

export const Wallet = mongoose.model<IWallet>('Wallet', walletSchema);
