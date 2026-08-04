import express from 'express';
import { newsController } from '../controllers/newsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', newsController.getAll);
router.get('/:id', newsController.getById);

router.post('/', authMiddleware, newsController.create);
router.put('/:id', authMiddleware, newsController.update);
router.delete('/:id', authMiddleware, newsController.delete);

export default router;
