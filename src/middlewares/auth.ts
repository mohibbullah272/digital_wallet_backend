import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utility/jwt';
import { AuthRequest } from '../types/base.interfase';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction)=>{
  try {
    const authHeader = req.header('Authorization');
    console.log('Auth header:', authHeader);
    
    const token = authHeader?.replace('Bearer ', '');
    console.log('Token:', token);
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
    
    const decoded = verifyToken(token);
    console.log('Decoded token:', decoded);
    
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ success: false, message: 'Invalid token.' });
  }
};

export const authorize = (roles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) =>{
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication required.' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'Access denied. Insufficient permissions.' });
    }
    
    next();
  };
};
