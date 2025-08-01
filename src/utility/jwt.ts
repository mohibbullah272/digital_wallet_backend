import jwt, { SignOptions } from 'jsonwebtoken';


const secret = process.env.JWT_SECRET;
if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

export const generateAccessToken = (payload: object): string => {
 
    const expiresIn = process.env.JWT_EXPIRES_IN;
  

  
    const options: SignOptions = {
      expiresIn: expiresIn as jwt.SignOptions['expiresIn'] || '1d'
    };
  
    return jwt.sign(payload, secret, options);
};

export const generateRefreshToken = (payload: object): string => {
  
    const expiresIn = process.env.JWT_REFRESH_EXPIRES_IN;
  

  
    const options: SignOptions = {
      expiresIn: expiresIn as jwt.SignOptions['expiresIn'] || '1d'
    };
  
    return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): any => {

  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error('Invalid token');
  }
};
