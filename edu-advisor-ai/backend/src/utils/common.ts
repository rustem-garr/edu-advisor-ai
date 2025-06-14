import { ErrorRequestHandler, RequestHandler } from "express";

// This type defines the shape of the data we expect in the request body for registration and login.
export type UserCredentials = {
    email: string;
    password: string;
};

// This type defines the shape of the data we send back on successful login.
export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

// A standard wrapper for all successful JSON responses.
export interface StandardResponse<T> {
    success: boolean;
    data: T;
}

// A custom error class that includes an HTTP status code.
export class ErrorWithStatus extends Error {
    constructor(public message: string, public status: number) {
        super(message);
    }
}

// Middleware to handle requests to routes that don't exist.
export const routerNotFoundHandler: RequestHandler = (req, res, next) => {
    next(new ErrorWithStatus('Route not found', 404));
};

// Middleware for handling all errors. 
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.error(error.stack); 
    
    if (error instanceof ErrorWithStatus) {
        res.status(error.status).json({ success: false, error: error.message });
    } else {
        res.status(500).json({ success: false, error: 'An internal server error occurred' });
    }
};