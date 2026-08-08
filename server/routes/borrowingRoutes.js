import express from 'express';
import { getBorrowings, getMyBorrowings, createBorrowing, returnBook } from '../controllers/borrowingController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getBorrowings);
router.get('/my', protect, getMyBorrowings);
router.post('/', protect, createBorrowing);
router.put('/:id/return', protect, returnBook);

export default router;
