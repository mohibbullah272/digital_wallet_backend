import { User } from '../user/user.model';
import { Wallet } from '../wallet/wallet.model';
import { Agent } from '../agent/agent.model';
import { hashPassword, comparePassword } from '../../utility/password';
import { generateAccessToken, generateRefreshToken, verifyToken } from '../../utility/jwt';
import { RegisterPayload, LoginPayload } from '../../types/base.interfase';

 const registerUser = async (payload: RegisterPayload): Promise<{ user: any; token: string }> => {
  const { name, email, password,  role } = payload;
  
  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  
  // Hash password
  const hashedPassword = await hashPassword(password);
  
  // Create user
  const user = new User({
    name,
    email,
    password: hashedPassword,
    role
  });
  
  await user.save();
  
  // Create wallet for user
  const wallet = new Wallet({
    userId: user._id as string,
    email:user.email as string
  });
  
  await wallet.save();
  
  // If role is agent, create agent profile
  if (role === 'agent') {
    const agent = new Agent({
      userId: user._id as string,
      email:user.email as string
    });
    
    await agent.save();
  }
  
  // Generate token
  const token = generateAccessToken({
    id: user._id as string,
    email: user.email,
    role: user.role
  });
  
  return { user, token };
};

 const loginUser = async (payload: LoginPayload): Promise<{ user: any; token: string; refreshToken: string }> => {
  const { email, password } = payload;
  
  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }
  
  // Check if user is blocked
  if (user.status === 'blocked') {
    throw new Error('Account is blocked');
  }
  
  // Validate password
  const isPasswordValid = await comparePassword(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }
  
  // Generate tokens
  const token = generateAccessToken({
    id: user._id as string,
    email: user.email,
    role: user.role
  });
  
  const refreshToken = generateRefreshToken({
    id: user._id as string,
    email: user.email,
    role: user.role
  });
  
  return { user, token, refreshToken };
};

 const refreshToken = async (refreshToken: string): Promise<{ token: string }> => {
  try {
    const decoded = verifyToken(refreshToken);
    
    // Find user
    const user = await User.findById(decoded.id);
    if (!user || user.status === 'blocked') {
      throw new Error('Invalid refresh token');
    }
    
    // Generate new access token
    const token = generateAccessToken({
      id: user._id as string,
      email: user.email,
      role: user.role
    });
    
    return { token };
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};



export  const authService ={
    refreshToken,
    loginUser,
    registerUser
}