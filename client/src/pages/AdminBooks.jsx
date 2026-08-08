import { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import api from '../services/api';

const AdminBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    api.get('/books')
      .then((res) => setBooks(res.data))
      .catch(() => setBooks([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ['All', ...new Set(books.map((book) => book.category))], [books]);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const term = search.toLowerCase();
      const matchesSearch = !term || [book.title, book.author, book.isbn, book.category].some((field) => field?.toLowerCase().includes(term));
      const matchesCategory = category === 'All' || book.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [books, search, category]);

  return (
    <div className="container page-shell">
      <div className="section-heading space-between">
        <div>
          <span className="eyebrow">Book management</span>
          <h2>Manage books</h2>
        </div>
        <div className="toolbar-inline stacked-controls">
          <div className="search-box compact-search">
            <Search size={16} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search books..." />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading library catalog...</div>
      ) : (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Copies</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.length === 0 ? (
                <tr>
                  <td colSpan="5" className="table-empty">No books match the current filters.</td>
                </tr>
              ) : (
                filteredBooks.map((book) => (
                  <tr key={book._id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td><span className="category-pill">{book.category}</span></td>
                    <td>{book.totalCopies}</td>
                    <td>{book.availableCopies}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminBooks;
