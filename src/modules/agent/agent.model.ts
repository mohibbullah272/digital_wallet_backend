import mongoose, { Schema } from 'mongoose';
import { IAgent } from '../../types/base.interfase';

const agentSchema = new Schema<IAgent>({
  userId: {
    type: String,
    required: [true, 'User ID is required'],
    unique: true
  },
  commissionRate: {
    type: Number,
    required: [true, 'Commission rate is required'],
    default: 2.5, // 2.5% commission
    min: [0, 'Commission rate cannot be negative'],
    max: [100, 'Commission rate cannot exceed 100%']
  },
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'suspended'],
    default: 'pending'
  }
}, {
  timestamps: true
});

export const Agent = mongoose.model<IAgent>('Agent', agentSchema);
