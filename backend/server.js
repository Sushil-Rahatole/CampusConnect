import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.routes.js';
import userRoutes from './routes/users.routes.js';

dotenv.config({path:"../.env"});

const app = express();

app.use(cors());
app.use(express.json());

app.use(postRoutes);
app.use(userRoutes);
app.use(express.static('uploads'));

const start = async()=>{
    const connectDB = await mongoose.connect(process.env.MONGO_URI);

    app.get('/',(req,res)=>{
        res.send('API is running....');
    });

    app.listen(9090,'0.0.0.0',()=>{
        console.log('Server is running on port 9090');
    })
}

start();