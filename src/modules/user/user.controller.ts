import { Response } from 'express';
import { userService } from './user.service';
import { successResponse, errorResponse } from '../../utility/response';
import { AuthRequest } from '../../types/base.interfase';

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const user = await userService.getUserById(userId);
    
    successResponse(res, user, 'User profile retrieved successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 404);
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.id;
    const updates = req.body;
    
    // Don't allow role or status updates through this endpoint
    delete updates.role;
    delete updates.status;
    
    const user = await userService.updateUser(userId, updates);
    
    successResponse(res, user, 'User profile updated successfully');
  } catch (error :any) {
    errorResponse(res, error.message, 400);
  }
};

