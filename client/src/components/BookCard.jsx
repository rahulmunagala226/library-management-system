import { motion } from 'framer-motion';
import { Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const BookCard = ({ book, onBorrow }) => {
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 260, damping: 15 }}
      className="book-card"
    >
      <img src={book.coverImage} alt={book.title} className="book-cover" />
      <div className="book-body">
        <div className="book-meta-row">
          <span className="category-pill">{book.category}</span>
          <span className="rating"><Star size={14} /> {book.rating || 4.5}</span>
        </div>
        <h3>{book.title}</h3>
        <p className="author">by {book.author}</p>
        <div className="book-info-grid">
          <span>ISBN: {book.isbn}</span>
          <span>{book.publicationYear}</span>
          <span>{book.availableCopies} available</span>
        </div>
        <div className="card-actions">
          <Link to={`/books/${book._id}`} className="secondary-btn">
            <BookOpen size={16} /> View
          </Link>
          <button className="primary-btn" onClick={() => onBorrow(book)} disabled={book.availableCopies < 1}>
            Borrow
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default BookCard;
