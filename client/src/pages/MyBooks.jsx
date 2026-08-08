import { useEffect, useMemo, useState } from 'react';
import { BookOpen, CalendarClock, CircleDollarSign, Search } from 'lucide-react';
import api from '../services/api';

const MyBooks = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchBorrowings = () => {
    api.get('/borrowings/my')
      .then((res) => setBorrowings(res.data))
      .catch(() => setBorrowings([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBorrowings();
  }, []);

  const filteredBorrowings = useMemo(() => {
    return borrowings.filter((item) => {
      const matchesSearch = [item.book?.title, item.book?.author].some((field) => field?.toLowerCase().includes(search.toLowerCase()));
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [borrowings, search, statusFilter]);

  const handleReturn = async (id) => {
    try {
      await api.put(`/borrowings/${id}/return`);
      fetchBorrowings();
      alert('Book returned successfully.');
    } catch (err) {
      alert(err.response?.data?.message || 'Return failed');
    }
  };

  return (
    <div className="container page-shell">
      <div className="section-heading space-between">
        <div>
          <span className="eyebrow">Student account</span>
          <h2>My Books</h2>
        </div>
        <div className="toolbar-inline stacked-controls">
          <div className="search-box compact-search">
            <Search size={16} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search my books..." />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="borrowed">Borrowed</option>
            <option value="returned">Returned</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading your borrowings...</div>
      ) : filteredBorrowings.length === 0 ? (
        <div className="empty-state">No books match your current search or filter.</div>
      ) : (
        <div className="info-card">
          {filteredBorrowings.map((item) => (
            <div key={item._id} className="my-book-row">
              <div className="my-book-info">
                <div className="icon-box"><BookOpen size={18} /></div>
                <div>
                  <h3>{item.book?.title || 'Book title'}</h3>
                  <p>{item.book?.author || 'Unknown author'}</p>
                </div>
              </div>

              <div className="my-book-meta">
                <span><CalendarClock size={15} /> Due: {new Date(item.dueDate).toLocaleDateString()}</span>
                <span><CircleDollarSign size={15} /> Fine: ₹{item.fine || 0}</span>
              </div>

              <div className="my-book-actions">
                <span className={`status-pill status-${item.status || 'borrowed'}`}>{item.status || 'borrowed'}</span>
                {item.status === 'borrowed' && (
                  <button className="primary-btn small-btn" onClick={() => handleReturn(item._id)}>Return</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBooks;
