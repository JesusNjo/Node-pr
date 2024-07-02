import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import clientRouter from './routes/clientroute';
import productRouter from './routes/productroute';

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev')); // Logging middleware

// Routes
app.use('/client', clientRouter);
app.use('/product', productRouter);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

export default app;
