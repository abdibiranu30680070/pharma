import express from 'express';
import { productController } from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', productController.getAll);
router.get('/featured', productController.getFeatured);
router.get('/:id', productController.getById);

// Admin protected routes
router.post('/upload', authMiddleware, upload.single('image'), productController.uploadImage);
router.post('/', authMiddleware, productController.create);
router.put('/:id', authMiddleware, productController.update);
router.delete('/:id', authMiddleware, productController.delete);

export default router;
