import mongoose, { Schema } from 'mongoose';
import { IUser } from '../../types/base.interfase';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phone:{
    type:String,
    unique:true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['admin', 'user', 'agent'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active'
  }
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);


