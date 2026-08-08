import Book from '../models/Book.js';
import User from '../models/User.js';
import Borrowing from '../models/Borrowing.js';
import { mockData } from '../mockData.js';
import { mockMode } from '../utils/mockMode.js';

export const getDashboardStats = async (req, res) => {
  try {
    if (mockMode.enabled) {
      const totalBooks = mockData.books.length;
      const totalUsers = mockData.users.length;
      const totalBorrowings = mockData.borrowings.length;
      const totalFines = mockData.borrowings.reduce((sum, item) => sum + (item.fine || 0), 0);
      const availableBooks = mockData.books.reduce((sum, book) => sum + (book.availableCopies || 0), 0);
      const issuedBooks = mockData.borrowings.filter((item) => item.status === 'borrowed' || item.status === 'overdue').length;
      const overdueBooks = mockData.borrowings.filter((item) => item.status === 'overdue').length;

      return res.json({
        totalBooks,
        totalUsers,
        totalBorrowings,
        totalFines,
        availableBooks,
        issuedBooks,
        overdueBooks,
        recentBorrowings: mockData.borrowings.slice(0, 5).map((item) => ({
          ...item,
          user: mockData.users.find((u) => u._id === item.user),
          book: mockData.books.find((b) => b._id === item.book),
        })),
      });
    }

    const [totalBooks, totalUsers, totalBorrowings, totalFines, availableBooks, issuedBooks, overdueBooks] = await Promise.all([
      Book.countDocuments(),
      User.countDocuments(),
      Borrowing.countDocuments(),
      Borrowing.aggregate([{ $group: { _id: null, total: { $sum: '$fine' } } }]),
      Book.aggregate([{ $group: { _id: null, total: { $sum: '$availableCopies' } } }]),
      Borrowing.countDocuments({ status: 'borrowed' }),
      Borrowing.countDocuments({ status: 'overdue' }),
    ]);

    res.json({
      totalBooks,
      totalUsers,
      totalBorrowings,
      totalFines: totalFines[0]?.total || 0,
      availableBooks: availableBooks[0]?.total || 0,
      issuedBooks,
      overdueBooks,
      recentBorrowings: await Borrowing.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name').populate('book', 'title'),
    });
  } catch (error) {
    res.status(500).json({ message: 'Dashboard stats unavailable' });
  }
};
