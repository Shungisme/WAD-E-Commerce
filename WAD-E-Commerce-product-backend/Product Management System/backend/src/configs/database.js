import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT_STRING);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

export default { connect };
