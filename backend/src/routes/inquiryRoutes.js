import express from 'express';
import { inquiryController } from '../controllers/inquiryController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route to submit inquiry
router.post('/', inquiryController.create);

// Admin protected routes
router.get('/', authMiddleware, inquiryController.getAll);
router.put('/:id/status', authMiddleware, inquiryController.updateStatus);
router.delete('/:id', authMiddleware, inquiryController.delete);

export default router;
