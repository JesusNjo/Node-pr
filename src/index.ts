import express from 'express';
import env from 'dotenv';
import clientRouter from './routes/clientroute';
import mongoose from 'mongoose';
import productRout from './routes/productroute';


env.config();
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL= process.env.MONGO_URL || 'mongodb://localhost:27017';
const MONGO_DB= process.env.MONGO_DB ||  'store';

app.use(express.json());



mongoose.connect(MONGO_URL,{dbName:MONGO_DB});
const db = mongoose.connection;


//Client routes

app.use('/client',clientRouter);

// Product routes

app.use('/product',productRout)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})

