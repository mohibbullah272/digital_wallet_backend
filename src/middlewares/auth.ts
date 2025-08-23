import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utility/jwt';
import { AuthRequest } from '../types/base.interfase';

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // 1. Token from header
    let token: string | undefined;

    const authHeader = req.header("Authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.replace("Bearer ", "");
    }

    // 2. Token from cookie (if not in header)
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ success: false, message: "Access denied. No token provided." });
    }

    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ success: false, message: "Invalid token." });
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
