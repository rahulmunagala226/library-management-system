import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BookOpen, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/books', label: 'Books' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const studentLinks = [
    { to: '/dashboard', label: 'Dashboard' },
    { to: '/books', label: 'Books' },
    { to: '/my-books', label: 'My Books' },
    { to: '/profile', label: 'Profile' },
  ];

  const adminLinks = [
    { to: '/admin', label: 'Dashboard' },
    { to: '/admin/books', label: 'Books' },
    { to: '/admin/users', label: 'Users' },
    { to: '/admin/borrowings', label: 'Borrowings' },
    { to: '/admin/fines', label: 'Fines' },
    { to: '/admin/reports', label: 'Reports' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = user ? (user.role === 'admin' ? adminLinks : studentLinks) : publicLinks;

  return (
    <header className="navbar-wrap">
      <nav className="navbar container">
        <Link to="/" className="logo"><BookOpen size={20} /> Smart Library</Link>
        <div className="nav-links desktop-nav">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
              {link.label}
            </NavLink>
          ))}
          {!user ? (
            <Link to="/login" className="primary-btn small-btn">Login</Link>
          ) : (
            <button className="secondary-btn small-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>

        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)} className="mobile-link">
              {link.label}
            </NavLink>
          ))}
          {!user ? (
            <Link to="/login" onClick={() => setOpen(false)} className="primary-btn wide-btn">Login</Link>
          ) : (
            <button className="secondary-btn wide-btn" onClick={handleLogout}>Logout</button>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
