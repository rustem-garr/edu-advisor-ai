import { RequestHandler } from "express";
import bcrypt from 'bcryptjs';
import { UserModel } from "./user.model";
import jwt from "jsonwebtoken";
import { UserCredentials, AuthTokens, StandardResponse, ErrorWithStatus } from "../utils/common";

export const registerUser: RequestHandler<unknown, StandardResponse<{ message: string }>, UserCredentials, unknown> = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            throw new ErrorWithStatus('User with this email already exists', 409); //409 Conflict status code
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await UserModel.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({ success: true, data: { message: 'User registered successfully' } });
    } catch (error) {
        next(error);
    }
};

export const loginUser: RequestHandler<unknown, StandardResponse<AuthTokens>, UserCredentials, unknown> = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        
        const user = await UserModel.findOne({ email });
        if (!user) {
            throw new ErrorWithStatus('Invalid email', 401); 
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new ErrorWithStatus('Invalid password', 401);
        }

        const accessToken = jwt.sign(
            { userId: user._id }, 
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.REFRESH_TOKEN_SECRET!,
            { expiresIn: '7d' }
        );

        res.status(200).json({ success: true, data: { accessToken, refreshToken } });

    } catch (error) {
        next(error);
    }
};