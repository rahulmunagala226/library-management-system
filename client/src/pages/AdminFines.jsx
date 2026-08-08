import { useEffect, useMemo, useState } from 'react';
import api from '../services/api';

const AdminFines = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/borrowings')
      .then((res) => setBorrowings(res.data))
      .catch(() => setBorrowings([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return borrowings.filter((item) => {
      if (filter === 'all') return true;
      if (filter === 'pending') return (item.fine || 0) > 0;
      if (filter === 'cleared') return (item.fine || 0) === 0;
      return item.status === filter;
    });
  }, [borrowings, filter]);

  const totalFine = filtered.reduce((sum, item) => sum + (item.fine || 0), 0);

  return (
    <div className="container page-shell">
      <div className="section-heading space-between">
        <div>
          <span className="eyebrow">Fine management</span>
          <h2>Fine and returns overview</h2>
        </div>
        <div className="toolbar-inline">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All records</option>
            <option value="pending">Pending fines</option>
            <option value="cleared">Cleared fines</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      <div className="stats-grid four-col">
        <div className="stat-card"><span className="counter">₹{totalFine}</span><label>Filtered fine total</label></div>
        <div className="stat-card"><span className="counter">{borrowings.filter((item) => (item.fine || 0) > 0).length}</span><label>Fine entries</label></div>
        <div className="stat-card"><span className="counter">{borrowings.filter((item) => item.status === 'overdue').length}</span><label>Overdue</label></div>
        <div className="stat-card"><span className="counter">{borrowings.filter((item) => item.status === 'returned').length}</span><label>Returned</label></div>
      </div>

      {loading ? (
        <div className="empty-state">Loading fine records...</div>
      ) : (
        <div className="table-card" style={{ marginTop: 24 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Status</th>
                <th>Fine</th>
                <th>Due date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan="5" className="table-empty">No fine records found.</td>
                </tr>
              ) : (
                filtered.map((item) => (
                  <tr key={item._id}>
                    <td>{item.user?.name || item.user || 'User'}</td>
                    <td>{item.book?.title || 'Book'}</td>
                    <td><span className={`status-pill status-${item.status || 'borrowed'}`}>{item.status || 'borrowed'}</span></td>
                    <td>₹{item.fine || 0}</td>
                    <td>{new Date(item.dueDate).toLocaleDateString()}</td>
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

export default AdminFines;
