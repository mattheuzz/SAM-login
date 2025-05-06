import mongoose from 'mongoose';

let isConnected: typeof mongoose | null = null;

export const connectToDatabase = async () => {
    if (isConnected) return isConnected;

    const uri = process.env.MONGODB_URI!;
    isConnected = await mongoose.connect(uri);
    return isConnected;
};
