import {Schema, model, Types} from 'mongoose';

const resourceSchema = new Schema({
    type: String,
    title: String,
    url: String,
}); 

const stepSchema = new Schema({
    stepNumber: Number,
    title: String,
    description: String,
    resources: [resourceSchema],
    isCompleted: { type: Boolean, default: false },
});

const roadmapSchema = new Schema({
    topic: { type: String, required: true },
    userInput: {
        experienceLevel: { type: String, required: true },
        learningStyle: { type: String, required: true },
    },
    steps: [stepSchema],
}, {
    timestamps: true 
});
 

const userSchema = new Schema({
    email: { type: String, unique: true, required: true, trim:true, lowercase:true },
    password: { type: String, required: true },
    roadmaps: [roadmapSchema] 
}, {
    timestamps: true
});

export const UserModel =  model("User", userSchema);


export interface LearningResource {
    _id: Types.ObjectId,
    source: string, 
    topic:string, 
    chunkText: string,
    embedding:number[]
}

const learningResourceSchema = new Schema<LearningResource>({
    source:{type:String, required:true},
    topic:{type:String, required:true, index:true},
    chunkText:{type:String, required:true},
    embedding: {
        type:[Number],
        required:true,
    },
},{
    timestamps:true
});

export const LearningResourceModel = model<LearningResource>('LearningResource', learningResourceSchema);