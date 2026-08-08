import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  publisher: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, default: 'https://images.unsplash.com/photo-1512820790803-83ca734da794' },
  totalCopies: { type: Number, required: true, min: 1 },
  availableCopies: { type: Number, required: true, min: 0 },
  rating: { type: Number, default: 4.5, min: 0, max: 5 },
  createdAt: { type: Date, default: Date.now },
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
