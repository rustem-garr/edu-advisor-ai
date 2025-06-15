import { ErrorRequestHandler, RequestHandler } from "express";

export type UserCredentials = {
    email: string;
    password: string;
};

export type UserPayload = {
    userId: string;
} 

// send back on successful login.
export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

// wrapper for all successful JSON responses.
export interface StandardResponse<T> {
    success: boolean;
    data: T;
}

// custom error, includes an HTTP status code.
export class ErrorWithStatus extends Error {
    constructor(public message: string, public status: number) {
        super(message);
    }
}

// middleware to handle requests to routes that dont exist.
export const routerNotFoundHandler: RequestHandler = (req, res, next) => {
    next(new ErrorWithStatus('Route not found', 404));
};

// middleware for handling all errors.
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.error(error.stack); 
    
    if (error instanceof ErrorWithStatus) {
        res.status(error.status).json({ success: false, error: error.message });
    } else {
        res.status(500).json({ success: false, error: 'An internal server error occurred' });
    }
};