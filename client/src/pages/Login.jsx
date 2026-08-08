import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/auth/login', form);
      login(data, data.token);
      navigate(data.role === 'admin' ? '/admin' : '/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="auth-page container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p className="auth-subtitle">Access your library dashboard</p>
        {error && <div className="error-box">{error}</div>}
        <label>Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <button className="primary-btn wide-btn" type="submit">Login</button>
        <p className="auth-switch">Need an account? <Link to="/register">Register</Link></p>
        <div className="demo-box">
          <strong>Demo Admin:</strong> admin@library.com / Admin@123
          <br />
          <strong>Demo Student:</strong> student@library.com / Student@123
        </div>
      </form>
    </div>
  );
};

export default Login;
