import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { config } from './src/config/config.js';
import { connectDB } from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import productRoutes from './src/routes/productRoutes.js';
import newsRoutes from './src/routes/newsRoutes.js';
import inquiryRoutes from './src/routes/inquiryRoutes.js';
import { errorMiddleware } from './src/middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
// We can also explicitly alias /uploads if needed, but since it's inside public/uploads, 
// express.static('public') will serve it at /uploads/... if we just access /uploads/...

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/inquiries', inquiryRoutes);

// Health check
app.get('/api/health', (req, res) => {
  const dbStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.status(200).json({
    status: 'OK',
    message: 'Pharmakon Backend API is operational',
    database: dbStates[mongoose.connection.readyState] || 'unknown',
    mongoUriSet: Boolean(process.env.MONGO_URI),
  });
});

// Centralized error handling
app.use(errorMiddleware);

// Initialize DB and start server
const startServer = async () => {
  await connectDB();
  app.listen(config.port, () => {
    console.log(`=================================`);
    console.log(`🚀 Pharmakon API Server running on port ${config.port}`);
    console.log(`=================================`);
  });
};

startServer();
