import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/database';

dotenv.config();

// Start server
const startServer = () => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

connectDB().then(startServer).catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1); // Exit process with failure
});
