import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from 'jsonwebtoken';
import  {ErrorWithStatus} from '../utils/common';


interface UserPayload {
    userId:string;
}

export const authMiddleware:RequestHandler = (req:Request, res:Response, next:NextFunction)=>{
    try{
        const authHeader = req.headers['authorization'];
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            throw new ErrorWithStatus('Authorization token is required', 401);
        }
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as UserPayload;

        req.user = { userId: decoded.userId}; 
        next();
    }
    catch(error){
        next(new ErrorWithStatus('Forbidden: Invalid or expired token', 403));
    }
}