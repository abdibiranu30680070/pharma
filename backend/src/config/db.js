import mongoose from 'mongoose';
import { config } from './config.js';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri, {
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`🍃 MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
    return true;
  } catch (error) {
    console.warn(`⚠️ MongoDB connection failed (${error.message}).`);
    console.warn(`📁 Server falling back to local JSON data storage.`);
    return false;
  }
};
