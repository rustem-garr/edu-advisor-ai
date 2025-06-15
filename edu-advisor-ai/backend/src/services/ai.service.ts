import {OpenAI} from 'openai';
import { LearningResourceModel } from '../users/user.model';

const openai = new OpenAI();

export const findRelevantContext = async(query:string, limit: number=3)=>{
    try{
        const embeddingResponse = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: query,
        });
        const queryVector = embeddingResponse.data[0].embedding;

        const similarDocuments = await LearningResourceModel.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embedding",
                    queryVector: queryVector,
                    numCandidates: 20,
                    limit: limit
                }
            },
            {
                $project: {
                    _id:0,
                    chunkText: 1,
                    source: 1
                }
            }
        ]);

        if(similarDocuments.length === 0){
            return "No specific context found";
        }

        return similarDocuments.map(doc=>`Source: ${doc.source} \nContent: ${doc.chunkText}`).join('\n\n');
    }
    catch(error){
        console.error("Error finding relevant context:", error);
        return "Context retrival failed";
    }
}