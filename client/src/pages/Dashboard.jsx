import { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalBorrowed: 0,
    currentlyBorrowed: 0,
    returnedBooks: 0,
    pendingFines: 0,
    dueSoon: 0,
  });

  useEffect(() => {
    if (!user) return;
    api.get('/borrowings/my')
      .then((res) => {
        const borrowings = res.data;
        setStats({
          totalBorrowed: borrowings.length,
          currentlyBorrowed: borrowings.filter((item) => item.status === 'borrowed').length,
          returnedBooks: borrowings.filter((item) => item.status === 'returned').length,
          pendingFines: borrowings.filter((item) => item.fine > 0).reduce((sum, item) => sum + item.fine, 0),
          dueSoon: borrowings.filter((item) => item.status === 'borrowed').length,
        });
      })
      .catch(() => {});
  }, [user]);

  return (
    <div className="container page-shell">
      <div className="section-heading">
        <span className="eyebrow">Student dashboard</span>
        <h2>Welcome, {user?.name || 'Student'}!</h2>
      </div>
      <div className="stats-grid four-col">
        <div className="stat-card"><span className="counter">{stats.totalBorrowed}</span><label>Total borrowed</label></div>
        <div className="stat-card"><span className="counter">{stats.currentlyBorrowed}</span><label>Currently borrowed</label></div>
        <div className="stat-card"><span className="counter">{stats.returnedBooks}</span><label>Returned books</label></div>
        <div className="stat-card"><span className="counter">₹{stats.pendingFines}</span><label>Pending fines</label></div>
      </div>
    </div>
  );
};

export default Dashboard;
