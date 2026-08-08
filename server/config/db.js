import mongoose from 'mongoose';
import { mockMode } from '../utils/mockMode.js';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is not configured');
    }

    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
    });

    mockMode.enabled = false;
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    mockMode.enabled = true;
    console.warn('MongoDB unavailable. Using mock-data mode for demonstration.');
  }
};

export default connectDB;
