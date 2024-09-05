import { Request, Response, NextFunction } from 'express';
import { getReasonPhrase, StatusCodes } from 'http-status-codes';
import { userRoletype, usertokentype } from '@ecommerce/types';
import * as dotenv from 'dotenv';
dotenv.config();
import * as jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: jwt.JwtPayload | string;
}

const Authorization = (role: userRoletype) => {
  return async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      console.log(authHeader);
      if (!authHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Authorization header is missing',
        });
      }

      // Check if the authorization header starts with "Bearer"
      if (authHeader.split(' ')[0] !== 'Bearer') {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Authorization scheme is not Bearer',
        });
      }

      const token = authHeader.split(' ')[1]; // Extract token
      if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Token is missing',
        });
      }

      const secret = process.env.JWT_SECRET_KEY;
      if (!secret) {
        throw new Error('JWT secret key is not defined');
      }

      const decoded: usertokentype = jwt.verify(token, secret);
      if (decoded.role !== role) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'You are not allwed in this protected route',
        });
      }
      req.user = decoded;

      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Invalid token',
          error: error.message, // More specific error message
        });
      }
      console.error('Authorization error:', error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
      });
    }
  };
};

export { Authorization };
