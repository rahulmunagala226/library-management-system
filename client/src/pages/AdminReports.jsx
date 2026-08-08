import { useEffect, useState } from 'react';
import api from '../services/api';

const AdminReports = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalBorrowings: 0,
    totalFines: 0,
    availableBooks: 0,
    issuedBooks: 0,
    overdueBooks: 0,
  });

  useEffect(() => {
    api.get('/dashboard/stats')
      .then((res) => setStats(res.data))
      .catch(() => setStats({
        totalBooks: 0,
        totalUsers: 0,
        totalBorrowings: 0,
        totalFines: 0,
        availableBooks: 0,
        issuedBooks: 0,
        overdueBooks: 0,
      }));
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container page-shell report-page">
      <div className="section-heading space-between">
        <div>
          <span className="eyebrow">Reports</span>
          <h2>Library performance summary</h2>
        </div>
        <button className="primary-btn small-btn" onClick={handlePrint}>Print report</button>
      </div>

      <div className="report-card">
        <div className="report-header">
          <div>
            <p className="report-label">Institution</p>
            <h3>Smart Library Management System</h3>
          </div>
          <div>
            <p className="report-label">Generated</p>
            <h3>{new Date().toLocaleDateString()}</h3>
          </div>
        </div>

        <div className="stats-grid four-col report-grid">
          <div className="stat-card"><span className="counter">{stats.totalBooks}</span><label>Total Books</label></div>
          <div className="stat-card"><span className="counter">{stats.totalUsers}</span><label>Total Users</label></div>
          <div className="stat-card"><span className="counter">{stats.totalBorrowings}</span><label>Total Borrowings</label></div>
          <div className="stat-card"><span className="counter">₹{stats.totalFines}</span><label>Collected Fines</label></div>
        </div>

        <div className="report-summary">
          <div className="info-card report-panel">
            <h3>Operational snapshot</h3>
            <ul>
              <li>Available copies in stock: {stats.availableBooks}</li>
              <li>Books currently issued: {stats.issuedBooks}</li>
              <li>Overdue items requiring attention: {stats.overdueBooks}</li>
              <li>System status: Demo mode with mock library data</li>
            </ul>
          </div>
          <div className="info-card report-panel">
            <h3>Library insight</h3>
            <ul>
              <li>Circulation activity is stable and responsive.</li>
              <li>Student borrowing is tracked with due and fine monitoring.</li>
              <li>Admin dashboards allow immediate action on overdue records.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReports;
