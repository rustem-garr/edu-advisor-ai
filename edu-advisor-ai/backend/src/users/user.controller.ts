import { RequestHandler } from "express";
import bcrypt from 'bcryptjs';
import { AddRoadmapBody, Roadmap, UserModel } from "./user.model";
import jwt from "jsonwebtoken";
import { UserCredentials, AuthTokens, StandardResponse, ErrorWithStatus } from "../utils/common";
import {OpenAI} from 'openai';

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
            process.env.SECRET!,
            { expiresIn: '15m' }
        );

        const refreshToken = jwt.sign(
            { userId: user._id },
            process.env.SECRET!,
            { expiresIn: '7d' }
        );

        res.status(200).json({ success: true, data: { accessToken, refreshToken } });

    } catch (error) {
        next(error);
    }
};


export const getRoadmaps: RequestHandler<unknown, StandardResponse<unknown>, unknown, unknown> = async(req, res, next) =>{
    try{
        // const userId = req.user.userId;
        const userId = (req as any).user.userId;
        const user = await UserModel.findOne({_id:userId}, {_id:1, roadmaps:1});
        if(!user){
            throw new ErrorWithStatus('User not found', 404);
        }
        res.status(200).json({success:true, data:user.roadmaps});
    }
    catch(error){
        next(error);
    }
}

export const addRoadmap:RequestHandler<unknown, StandardResponse<unknown>, AddRoadmapBody, unknown>= async(req, res, next)=>{
    try{
        // const userId = req.user.userId;
        const userId = (req as any).user.userId;
        const {topic, userInput} = req.body;

        const user = await UserModel.findOne({_id:userId});
        if(!user){
            throw new ErrorWithStatus('User not found', 404);
        }
        user.roadmaps.push({
            topic,
            userInput,
            steps:[]
        });
        await user.save();
        const createdRoadmap = user.roadmaps[user.roadmaps.length-1];
        res.status(201).json({success:true, data:createdRoadmap});
    }
    catch(error){
        next(error);
    }
}

export const deleteRoadmap: RequestHandler<{roadmapId:string}> = async(req, res, next)=>{
    try{
        // const userId = req.user.userId;
        const userId = (req as any).user.userId;
        const {roadmapId} = req.params;
        const result = await UserModel.updateOne(
            {_id:userId},
            {$pull: {roadmaps:{_id:roadmapId}}}
        );
        if(result.modifiedCount===0){
            throw new ErrorWithStatus("Roadmap not found or user not authorized to delete", 404);
        }
        res.status(200).json({success:true, data:{message:"Roadmap deleted successfully"}});
    }
    catch(error){
        next(error);
    }
}

export const generateRoadmapSteps:RequestHandler<{roadmapId: string}> = async(req, res, next)=>{
    try{
        // const userId = req.user?.userId;
        const userId = (req as any).user.userId;
        const {roadmapId}=req.params;

        const user = await UserModel.findOne({_id:userId});
        if(!user){
            throw new ErrorWithStatus('User not found', 404);
        }
        const roadmap = user.roadmaps.id(roadmapId);
        if(!roadmap){
            throw new ErrorWithStatus('Roadmap not found for this user', 404);
        }
        const openai = new OpenAI();
        const systemPrompt = `You are EduAdvisor AI, an expert academic advisor. 
        Your goal is to create a detailed, step-by-step learning roadmap. 
        Provide the output as a valid JSON object containing a single key "steps". 
        The value of "steps" should be an array of objects, 
        where each object has "stepNumber", "title", and "description".`;

        const userPrompt = `Create a learning roadmap on the topic: 
        ${roadmap.topic} for a user whose experience 
        level is ${roadmap.userInput?.experienceLevel}`;

        const response = await openai.chat.completions.create({
            model:"gpt-4o-mini",
            messages:[
                {role:"system", content:systemPrompt},
                {role:"user", content:userPrompt}
            ],
            response_format:{type:'json_object'}
        });

        if(response.choices[0].message.content){
            const aiResponse = JSON.parse(response.choices[0].message.content);
            roadmap.steps = aiResponse.steps;
            await user.save();
        }
        else{
            throw new ErrorWithStatus('AI failed to generate roadmap steps', 500);
        }
        res.status(200).json({success:true, data:roadmap});

    }
    catch(error){
        next(error);
    }
}