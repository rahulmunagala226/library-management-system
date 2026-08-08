import Borrowing from '../models/Borrowing.js';
import Book from '../models/Book.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';
import { calculateFine } from '../utils/fineCalculator.js';
import { mockData, getMockBookById } from '../mockData.js';
import { mockMode } from '../utils/mockMode.js';

const BORROWING_LIMIT = 5;
const BORROW_DAYS = 14;

export const getBorrowings = async (req, res) => {
  try {
    if (mockMode.enabled) {
      return res.json(mockData.borrowings.map((item) => ({
        ...item,
        user: mockData.users.find((u) => u._id === item.user),
        book: mockData.books.find((b) => b._id === item.book),
      })));
    }

    const borrowings = await Borrowing.find().populate('user', 'name email studentId').populate('book', 'title author');
    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch borrowings' });
  }
};

export const getMyBorrowings = async (req, res) => {
  try {
    if (mockMode.enabled) {
      const userId = req.user?._id || 'student-user';
      const borrowings = mockData.borrowings.filter((item) => item.user === userId);
      return res.json(borrowings.map((item) => ({ ...item, book: getMockBookById(item.book) })));
    }

    const borrowings = await Borrowing.find({ user: req.user._id }).populate('book', 'title author coverImage').sort({ createdAt: -1 });
    res.json(borrowings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch your borrowings' });
  }
};

export const createBorrowing = async (req, res) => {
  try {
    const { bookId } = req.body;

    if (mockMode.enabled) {
      const book = getMockBookById(bookId);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      if (book.availableCopies < 1) return res.status(400).json({ message: 'Book is currently unavailable' });

      const userId = req.user?._id || 'student-user';
      const activeBorrowings = mockData.borrowings.filter((item) => item.user === userId && item.status === 'borrowed').length;
      if (activeBorrowings >= BORROWING_LIMIT) {
        return res.status(400).json({ message: 'Borrowing limit reached' });
      }

      const issueDate = new Date();
      const dueDate = new Date();
      dueDate.setDate(issueDate.getDate() + BORROW_DAYS);

      const borrowing = {
        _id: `borrow-${Date.now()}`,
        user: userId,
        book: bookId,
        issueDate,
        dueDate,
        status: 'borrowed',
        fine: 0,
        fineStatus: 'No Fine',
        createdAt: new Date(),
      };

      mockData.borrowings.push(borrowing);
      book.availableCopies -= 1;
      return res.status(201).json(borrowing);
    }

    const user = await User.findById(req.user._id);
    const book = await Book.findById(bookId);

    if (!book) return res.status(404).json({ message: 'Book not found' });
    if (book.availableCopies < 1) return res.status(400).json({ message: 'Book is currently unavailable' });

    const activeBorrowings = await Borrowing.countDocuments({ user: req.user._id, status: 'borrowed' });
    if (activeBorrowings >= BORROWING_LIMIT) {
      return res.status(400).json({ message: 'Borrowing limit reached' });
    }

    const issueDate = new Date();
    const dueDate = new Date();
    dueDate.setDate(issueDate.getDate() + BORROW_DAYS);

    const borrowing = await Borrowing.create({
      user: req.user._id,
      book: bookId,
      issueDate,
      dueDate,
      status: 'borrowed',
      fineStatus: 'No Fine',
    });

    book.availableCopies -= 1;
    await book.save();

    await Notification.create({
      user: req.user._id,
      title: 'Book borrowed',
      message: `You borrowed ${book.title}. Due date: ${dueDate.toDateString()}`,
      type: 'success',
    });

    res.status(201).json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message || 'Borrowing failed' });
  }
};

export const returnBook = async (req, res) => {
  try {
    if (mockMode.enabled) {
      const borrowing = mockData.borrowings.find((item) => item._id === req.params.id);
      if (!borrowing) return res.status(404).json({ message: 'Borrowing record not found' });
      if (borrowing.status === 'returned') return res.status(400).json({ message: 'Book already returned' });

      const returnDate = new Date();
      borrowing.returnDate = returnDate;
      borrowing.status = 'returned';
      const fine = calculateFine(borrowing.dueDate, returnDate);
      borrowing.fine = fine;
      borrowing.fineStatus = fine > 0 ? 'Pending' : 'No Fine';

      const book = getMockBookById(borrowing.book);
      if (book) {
        book.availableCopies += 1;
      }
      return res.json({ message: 'Book returned successfully', fine });
    }

    const borrowing = await Borrowing.findById(req.params.id).populate('book');
    if (!borrowing) return res.status(404).json({ message: 'Borrowing record not found' });

    if (borrowing.status === 'returned') {
      return res.status(400).json({ message: 'Book already returned' });
    }

    const returnDate = new Date();
    borrowing.returnDate = returnDate;
    borrowing.status = 'returned';

    const fine = calculateFine(borrowing.dueDate, returnDate);
    borrowing.fine = fine;
    borrowing.fineStatus = fine > 0 ? 'Pending' : 'No Fine';

    await borrowing.save();

    const book = await Book.findById(borrowing.book._id);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    await Notification.create({
      user: borrowing.user,
      title: 'Book returned',
      message: `You returned ${borrowing.book.title}. Fine: ₹${fine}`,
      type: 'info',
    });

    res.json({ message: 'Book returned successfully', fine });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Return failed' });
  }
};
