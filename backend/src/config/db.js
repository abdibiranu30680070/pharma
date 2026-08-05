import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
  if (!process.env.MONGODB_URI && !process.env.MONGO_URI) {
    console.warn(`⚠️  Neither MONGODB_URI nor MONGO_URI environment variable is set.`);
    console.warn(`📁  Falling back to local JSON data storage.`);
    return false;
  }
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.error(`❌ MongoDB connection failed: ${error.message}`);
    console.warn(`📁 Falling back to local JSON data storage.`);
    return false;
  }
};
