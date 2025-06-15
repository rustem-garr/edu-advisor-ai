import mongoose from "mongoose";
import fs from 'fs/promises';
import dotenv from 'dotenv';
import {OpenAI} from 'openai';
import { LearningResourceModel} from "../users/user.model";
import * as path from 'path';

dotenv.config({path: '.env'});
const openai = new OpenAI();

const embeddingToDb = async()=>{
    if(!process.env.MONGO_URI){
        throw new Error("MONGO_URI is not defined in the .env file");
    }
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");

        const filePath = path.join(__dirname, '../data/resources.json')
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const resources = JSON.parse(fileContent);

        await LearningResourceModel.deleteMany({});
        console.log("Cleared existing test learning resources");

        for (const resource of resources){
            console.log(`Generating embedding for: "${resource.topic}"...`);
            const embeddingResponse = await openai.embeddings.create({
                model: "text-embedding-3-small",
                input: resource.chunkText,
            });

            const newResource = await LearningResourceModel.create({
                source: resource.source, 
                topic: resource.topic,
                chunkText: resource.chunkText,
                embedding: embeddingResponse.data[0].embedding
            });

            console.log(`Saved resource for "${resource.topic}"`)
        }
        console.log("Task completed successfully");
    }
    catch(error){
        console.error(error);
    }
    finally{
        await mongoose.disconnect();
        console.log("MongoDB disconnected.")
    }
}

embeddingToDb();