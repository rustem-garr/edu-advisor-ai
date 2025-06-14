import {Schema, model} from 'mongoose';

const userSchema = new Schema({
    email: {type:String, required:true, unique:true, trim:true, lowercase:true},
    password: {type:String, required:true}
}, {timestamps:true});

export type User = {
    email:string,
    password:string
}

export const UserModel =  model("User", userSchema);