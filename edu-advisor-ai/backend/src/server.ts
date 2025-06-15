import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './users/user.routes';
import { errorHandler, routerNotFoundHandler } from './utils/common';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.use(routerNotFoundHandler); //handles non-existent routes
app.use(errorHandler); //handles all other errors

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log("MongoDB connected:", conn.connection.host);
    }
    catch(error){
        if (error instanceof Error){
            console.error("Error:", error.message);
        }
        process.exit(1);
    }
}

app.get('/', (req:Request, res:Response)=>{
    res.send('EduAdvisor AI backend is running!');
});


const start = async() => {
    await connectDB();
    app.listen(port, ()=>{
        console.log(`Server is running at http://localhost:${port}`);
    });
};

start()