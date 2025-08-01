import { z } from 'zod';
import { Document } from 'mongoose';

// Base types
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'admin' | 'user' | 'agent';
  status: 'active' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

export interface IWallet extends Document {
  userId: string;
  balance: number;
  status: 'active' | 'blocked';
  createdAt: Date;
  updatedAt: Date;
}

export interface ITransaction extends Document {
  type: 'deposit' | 'withdrawal' | 'transfer' | 'cash-in' | 'cash-out';
  amount: number;
  fee: number;
  commission?: number;
  senderId?: string;
  receiverId?: string;
  initiatedBy: string;
  status: 'pending' | 'completed' | 'failed' | 'reversed';
  referenceId: string;
  description?: string;
  createdAt: Date;
}

export interface IAgent extends Document {
  userId: string;
  commissionRate: number;
  approvalStatus: 'pending' | 'approved' | 'suspended';
  createdAt: Date;
  updatedAt: Date;
}

export interface ISystemParameters extends Document {
  transactionFee: number;
  userDailyLimit: number;
  userMonthlyLimit: number;
  agentDailyLimit: number;
  agentMonthlyLimit: number;
  minBalance: number;
  createdAt: Date;
  updatedAt: Date;
}

// Request with user info
export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'admin' | 'user' | 'agent';
  };
}


export const registerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().min(1, "Phone number is required"),
  role: z.enum(["user", "agent"]).default("user")
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string().min(1, "Password is required")
});

export const transactionSchema = z.object({
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().optional()
});

export const transferSchema = z.object({
  receiverId: z.string().min(1, "Receiver ID is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().optional()
});

export const agentTransactionSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  amount: z.number().positive("Amount must be greater than 0"),
  description: z.string().optional()
});

export const systemParamsSchema = z.object({
  transactionFee: z.number().min(0).optional(),
  userDailyLimit: z.number().min(0).optional(),
  userMonthlyLimit: z.number().min(0).optional(),
  agentDailyLimit: z.number().min(0).optional(),
  agentMonthlyLimit: z.number().min(0).optional(),
  minBalance: z.number().min(0).optional()
});


export type RegisterPayload = z.infer<typeof registerSchema>;
export type LoginPayload = z.infer<typeof loginSchema>;
export type TransactionPayload = z.infer<typeof transactionSchema>;
export type TransferPayload = z.infer<typeof transferSchema>;
export type AgentTransactionPayload = z.infer<typeof agentTransactionSchema>;
export type SystemParamsPayload = z.infer<typeof systemParamsSchema>;
