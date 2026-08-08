import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    studentId: '',
    phone: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { data } = await api.post('/auth/register', form);
      login(data, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="auth-page container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Register</h2>
        {error && <div className="error-box">{error}</div>}
        <label>Full Name
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>Email
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </label>
        <label>Password
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </label>
        <label>Confirm Password
          <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
        </label>
        <label>Student ID
          <input type="text" name="studentId" value={form.studentId} onChange={handleChange} required />
        </label>
        <label>Phone
          <input type="text" name="phone" value={form.phone} onChange={handleChange} required />
        </label>
        <button className="primary-btn wide-btn" type="submit">Create Account</button>
        <p className="auth-switch">Already have an account? <Link to="/login">Login</Link></p>
      </form>
    </div>
  );
};

export default Register;
