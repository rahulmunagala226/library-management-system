import { useEffect, useState } from 'react';
import { BarChart3, BookOpen, Users, AlertTriangle } from 'lucide-react';
import api from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalBorrowings: 0,
    totalFines: 0,
    availableBooks: 0,
    issuedBooks: 0,
    overdueBooks: 0,
    recentBorrowings: [],
  });
  const [loading, setLoading] = useState(true);

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
        recentBorrowings: [],
      }))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total Books', value: stats.totalBooks, icon: BookOpen },
    { label: 'Students / Users', value: stats.totalUsers, icon: Users },
    { label: 'Issued Books', value: stats.issuedBooks, icon: BarChart3 },
    { label: 'Overdue Books', value: stats.overdueBooks, icon: AlertTriangle },
  ];

  return (
    <div className="container page-shell">
      <div className="section-heading">
        <span className="eyebrow">Admin dashboard</span>
        <h2>Library overview</h2>
      </div>

      {loading ? (
        <div className="empty-state">Loading dashboard data...</div>
      ) : (
        <>
          <div className="stats-grid four-col">
            {cards.map(({ label, value, icon: Icon }) => (
              <div className="stat-card" key={label}>
                <Icon size={22} style={{ margin: '0 auto 12px', color: '#2563eb' }} />
                <span className="counter">{value}</span>
                <label>{label}</label>
              </div>
            ))}
          </div>

          <div className="section-block">
            <div className="section-heading">
              <h3>Recent activity</h3>
            </div>
            <div className="info-card" style={{ overflow: 'hidden' }}>
              <div className="book-info-grid" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr', marginBottom: 0 }}>
                <strong>Book</strong>
                <strong>User</strong>
                <strong>Status</strong>
                <strong>Fine</strong>
              </div>
              {stats.recentBorrowings.length === 0 ? (
                <div className="empty-state" style={{ marginTop: 18 }}>No recent borrowings recorded.</div>
              ) : (
                stats.recentBorrowings.map((item) => (
                  <div key={item._id} className="book-info-grid" style={{ gridTemplateColumns: '1.5fr 1fr 1fr 1fr', marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(148,163,184,0.2)' }}>
                    <span>{item.book?.title || 'Book'}</span>
                    <span>{item.user?.name || 'User'}</span>
                    <span>{item.status}</span>
                    <span>₹{item.fine || 0}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
