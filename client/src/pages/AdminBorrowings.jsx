import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminBorrowings = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    api.get('/borrowings')
      .then((res) => setBorrowings(res.data))
      .catch(() => setBorrowings([]))
      .finally(() => setLoading(false));
  }, []);

  const filteredBorrowings = borrowings.filter((item) => statusFilter === 'all' || item.status === statusFilter);

  return (
    <div className="container page-shell">
      <div className="section-heading space-between">
        <div>
          <span className="eyebrow">Borrowing records</span>
          <h2>Issued and returned books</h2>
        </div>
        <div className="toolbar-inline">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="all">All status</option>
            <option value="borrowed">Borrowed</option>
            <option value="returned">Returned</option>
            <option value="overdue">Overdue</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="empty-state">Loading borrowings...</div>
      ) : (
        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>Book</th>
                <th>User</th>
                <th>Status</th>
                <th>Due</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
              {filteredBorrowings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="table-empty">No borrowing data available.</td>
                </tr>
              ) : (
                filteredBorrowings.map((item) => (
                  <tr key={item._id}>
                    <td>{item.book?.title || 'Book'}</td>
                    <td>{item.user?.name || item.user || 'User'}</td>
                    <td><span className={`status-pill status-${item.status || 'borrowed'}`}>{item.status || 'borrowed'}</span></td>
                    <td>{new Date(item.dueDate).toLocaleDateString()}</td>
                    <td>₹{item.fine || 0}</td>
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

export default AdminBorrowings;
