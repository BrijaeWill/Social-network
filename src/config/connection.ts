import mongoose from 'mongoose';

const db = async (): Promise<typeof mongoose.connection> =>{
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/classcamp');
        console.log('Database connected.');
        return mongoose.connection;
    } catch(error) {
        console.error('Database connection error:', error);
        throw new Error('Database connection failed.');
    }
}

export default db;