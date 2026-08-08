import User from '../models/User.js';
import Borrowing from '../models/Borrowing.js';
import { mockData, sanitizeUser, getMockUserById } from '../mockData.js';
import { mockMode } from '../utils/mockMode.js';

export const getUsers = async (req, res) => {
  try {
    if (mockMode.enabled) {
      return res.json(mockData.users.map((user) => sanitizeUser(user)));
    }

    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users' });
  }
};

export const getUserById = async (req, res) => {
  try {
    if (mockMode.enabled) {
      const user = getMockUserById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      return res.json(sanitizeUser(user));
    }

    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};

export const updateUser = async (req, res) => {
  try {
    if (mockMode.enabled) {
      const index = mockData.users.findIndex((user) => user._id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'User not found' });
      mockData.users[index] = { ...mockData.users[index], ...req.body };
      return res.json(sanitizeUser(mockData.users[index]));
    }

    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message || 'User update failed' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (mockMode.enabled) {
      const index = mockData.users.findIndex((user) => user._id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'User not found' });
      mockData.users.splice(index, 1);
      return res.json({ message: 'User deleted successfully' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'User deletion failed' });
  }
};

export const getUserBorrowings = async (req, res) => {
  if (mockMode.enabled) {
    const borrowings = mockData.borrowings.filter((item) => item.user === req.params.id);
    return res.json(borrowings.map((item) => ({ ...item, book: mockData.books.find((book) => book._id === item.book) })));
  }

  const borrowings = await Borrowing.find({ user: req.params.id }).populate('book', 'title author');
  res.json(borrowings);
};
