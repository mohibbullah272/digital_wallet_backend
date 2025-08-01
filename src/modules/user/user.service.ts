import { User } from './user.model';

 const getUserById = async (id: string): Promise<any> => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

 const updateUser = async (id: string, updates: any): Promise<any> => {
  const user = await User.findByIdAndUpdate(id, updates, { new: true }).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const blockUser = async (id: string): Promise<any> => {
  const user = await User.findByIdAndUpdate(id, { status: 'blocked' }, { new: true }).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

 const unblockUser = async (id: string): Promise<any> => {
  const user = await User.findByIdAndUpdate(id, { status: 'active' }, { new: true }).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const userService={
    unblockUser,
    blockUser,
    updateUser,
    getUserById
}
