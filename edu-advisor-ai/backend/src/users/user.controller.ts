import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { UserModel } from "./user.model";
import jwt from "jsonwebtoken";

export const registerUser = async (req:Request, res:Response) => {
    try{
        const {email, password} = req.body;

        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            res.status(400).json({message:'User with this email already exist'});
            return
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({
            email,
            password:hashedPassword
        });

        res.status(201).json({message:'User registered successfully'});
    }
    catch(error){
        if (error instanceof Error){
            res.status(500).json({message:error.message});
        }
        else{
            res.status(500).json({message:'unknown error occured'});
        }
    }
}

export const loginUser = async (req:Request, res:Response) => {
    try{
        const {email, password} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            res.status(401).json({message:'Invalid email'});
        }
        const accessToken = jwt.sign(
            {userId: user!._id},
            process.env.ACCESS_TOKEN_SECRET!,
            {expiresIn: '15m'}
        );

        const refreshToken = jwt.sign(
            {userId:user!._id},
            process.env.REFRESH_TOKEN_SECRET!,
            {expiresIn:'7d'}
        );

        res.status(200).json({accessToken, refreshToken});

    }
    catch(error){
        if (error instanceof Error){
            res.status(500).json({message:error.message});
        }
        else{
            res.status(500).json({message:'Unknown error occurred'});
        }
    }
}
