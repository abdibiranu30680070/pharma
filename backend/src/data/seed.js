import mongoose from 'mongoose';
import fs from 'fs/promises';
import dotenv from 'dotenv';

dotenv.config();

import { config } from '../config/config.js';
import { Product } from '../models/schemas/ProductSchema.js';
import { User } from '../models/schemas/UserSchema.js';

const seedDatabase = async () => {
  try {
    console.log(`Connecting to MongoDB: ${config.mongoUri}`);
    await mongoose.connect(config.mongoUri);

    console.log('Seeding products...');
    const productsData = JSON.parse(await fs.readFile(config.productsFilePath, 'utf-8'));
    await Product.deleteMany({});
    
    // Clean products ID field before saving to mongo
    const cleanProducts = productsData.map(({ id, ...rest }) => rest);
    await Product.insertMany(cleanProducts);
    console.log(`✅ Seeded ${cleanProducts.length} products to MongoDB.`);

    console.log('Seeding admin user...');
    const usersData = JSON.parse(await fs.readFile(config.usersFilePath, 'utf-8'));
    await User.deleteMany({});
    const cleanUsers = usersData.map(({ id, ...rest }) => rest);
    await User.insertMany(cleanUsers);
    console.log(`✅ Seeded ${cleanUsers.length} admin user(s) to MongoDB.`);

    console.log('🎉 MongoDB database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
