import { Request, Response } from 'express';
import {  authService } from './auth.service';
import { successResponse, errorResponse } from '../../utility/response';
import { RegisterPayload, LoginPayload } from '../../types/base.interfase';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: RegisterPayload = req.body;
    const { user, token } = await authService.registerUser(payload);
    
    res.cookie("token", token, {
      httpOnly: true,       
      secure:true,
      sameSite: "strict",   
    });


    successResponse(res, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
   
    }, 'User registered successfully', 201);

  } catch (error:any) {
    errorResponse(res, error.message, 400);
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload: LoginPayload = req.body;
    const { user, token, refreshToken } = await authService.loginUser(payload);
    

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000 // 15 min
    });

    // set refresh token cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure:true ,
      sameSite: "strict",

    });

    successResponse(res, {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
     
    }, 'Login successful');
  } catch (error:any) {
    errorResponse(res, error.message, 401);
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return errorResponse(res, 'Refresh token is required', 400);
    }
    
    const { token } = await authService.refreshToken(refreshToken);
    
    successResponse(res, { token }, 'Token refreshed successfully');
  } catch (error:any) {
    errorResponse(res, error.message, 401);
  }
};

