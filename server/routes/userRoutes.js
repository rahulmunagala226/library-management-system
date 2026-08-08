import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser, getUserBorrowings } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { admin } from '../middleware/adminMiddleware.js';

const router = express.Router();

router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.get('/:id/borrowings', protect, admin, getUserBorrowings);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

export default router;
