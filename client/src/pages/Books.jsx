import { useEffect, useMemo, useState } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../services/api';
import BookCard from '../components/BookCard';
import { useAuth } from '../context/AuthContext';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState('title');
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    api.get('/books')
      .then((res) => setBooks(res.data))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredBooks = useMemo(() => {
    const result = books.filter((book) => {
      const matchesSearch = [book.title, book.author, book.category, book.isbn].some((field) =>
        field?.toLowerCase().includes(search.toLowerCase())
      );
      const matchesCategory = category === 'All' || book.category === category;
      return matchesSearch && matchesCategory;
    });

    result.sort((a, b) => {
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'availability') return (b.availableCopies || 0) - (a.availableCopies || 0);
      return a.title.localeCompare(b.title);
    });

    return result;
  }, [books, search, category, sortBy]);

  const handleBorrow = async (book) => {
    if (!user) return window.location.href = '/login';
    try {
      await api.post('/borrowings', { bookId: book._id });
      alert('Book issued successfully!');
      setBooks((prev) => prev.map((item) => item._id === book._id ? { ...item, availableCopies: item.availableCopies - 1 } : item));
    } catch (error) {
      alert(error.response?.data?.message || 'Borrowing failed');
    }
  };

  const categories = ['All', ...new Set(books.map((book) => book.category))];

  return (
    <div className="container page-shell">
      <div className="section-heading space-between">
        <div>
          <span className="eyebrow">Catalog</span>
          <h2>Browse Books</h2>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <Search size={18} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by title, author or ISBN" />
        </div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title">Sort by Title</option>
          <option value="rating">Sort by Rating</option>
          <option value="availability">Sort by Availability</option>
        </select>
      </div>

      {loading ? (
        <div className="empty-state"><BookOpen size={22} /> Loading books...</div>
      ) : filteredBooks.length === 0 ? (
        <div className="empty-state">No books found for your current search.</div>
      ) : (
        <motion.div layout className="books-grid">
          {filteredBooks.map((book) => (
            <BookCard key={book._id} book={book} onBorrow={handleBorrow} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Books;
