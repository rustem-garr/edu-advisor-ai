import {Types} from 'mongoose';

export interface Roadmap {
    _id: Types.ObjectId,
    topic:string,
    userInput: {
        experienceLevel: string,
        learningStyle:string
    };
    steps:any[],
    createdAt:Date,
    updatedAt:Date
}