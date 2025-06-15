import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ErrorWithStatus, UserPayload } from '../utils/common';


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new ErrorWithStatus('Authorization token is required', 401);
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET!) as UserPayload;
        
        (req as any).user = { userId: decoded.userId };
        
        next();
    } catch (error) {
        next(new ErrorWithStatus('Forbidden: Invalid or expired token', 403));
    }
};