import Book from '../models/Book.js';
import { mockData, getMockBookById } from '../mockData.js';
import { mockMode } from '../utils/mockMode.js';

export const getBooks = async (req, res) => {
  try {
    if (mockMode.enabled) {
      return res.json(mockData.books);
    }

    const books = await Book.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch books' });
  }
};

export const getBookById = async (req, res) => {
  try {
    if (mockMode.enabled) {
      const book = getMockBookById(req.params.id);
      if (!book) return res.status(404).json({ message: 'Book not found' });
      return res.json(book);
    }

    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch book' });
  }
};

export const createBook = async (req, res) => {
  try {
    if (mockMode.enabled) {
      const newBook = {
        _id: `book-${Date.now()}`,
        ...req.body,
        createdAt: new Date(),
      };
      mockData.books.push(newBook);
      return res.status(201).json(newBook);
    }

    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Book creation failed' });
  }
};

export const updateBook = async (req, res) => {
  try {
    if (mockMode.enabled) {
      const index = mockData.books.findIndex((book) => book._id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Book not found' });
      const updated = { ...mockData.books[index], ...req.body };
      mockData.books[index] = updated;
      return res.json(updated);
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message || 'Book update failed' });
  }
};

export const deleteBook = async (req, res) => {
  try {
    if (mockMode.enabled) {
      const index = mockData.books.findIndex((book) => book._id === req.params.id);
      if (index === -1) return res.status(404).json({ message: 'Book not found' });
      mockData.books.splice(index, 1);
      return res.json({ message: 'Book deleted successfully' });
    }

    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Book delete failed' });
  }
};
