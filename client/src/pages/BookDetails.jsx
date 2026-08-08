import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, CalendarDays, LoaderCircle, Star } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get(`/books/${id}`)
      .then((res) => setBook(res.data))
      .catch(() => setError('Book details could not be loaded.'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBorrow = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    try {
      await api.post('/borrowings', { bookId: book._id });
      alert('Book issued successfully!');
      navigate('/my-books');
    } catch (err) {
      alert(err.response?.data?.message || 'Borrowing failed');
    }
  };

  if (loading) {
    return (
      <div className="container page-shell page-loading">
        <LoaderCircle className="spin-icon" size={28} />
        Loading book details...
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="container page-shell">
        <div className="empty-state">{error || 'Book not found.'}</div>
      </div>
    );
  }

  return (
    <div className="container page-shell">
      <button className="secondary-btn" onClick={() => navigate('/books')} style={{ marginBottom: 24 }}>
        <ArrowLeft size={16} /> Back to catalog
      </button>

      <div className="book-detail-card">
        <img src={book.coverImage} alt={book.title} className="book-detail-cover" />
        <div className="book-detail-body">
          <span className="category-pill">{book.category}</span>
          <h2>{book.title}</h2>
          <p className="book-detail-author">by {book.author}</p>

          <div className="book-detail-meta">
            <span><Star size={16} /> {book.rating || 4.5}</span>
            <span><BookOpen size={16} /> {book.availableCopies} available</span>
            <span><CalendarDays size={16} /> {book.publicationYear}</span>
          </div>

          <p className="book-detail-description">{book.description}</p>

          <div className="book-info-grid detail-grid">
            <span><strong>ISBN:</strong> {book.isbn}</span>
            <span><strong>Publisher:</strong> {book.publisher}</span>
            <span><strong>Total copies:</strong> {book.totalCopies}</span>
            <span><strong>Available copies:</strong> {book.availableCopies}</span>
          </div>

          <div className="card-actions detail-actions">
            <button className="primary-btn" onClick={handleBorrow} disabled={book.availableCopies < 1}>
              {book.availableCopies > 0 ? 'Borrow this book' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
