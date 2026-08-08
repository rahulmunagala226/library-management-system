import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';
import { mockData, getMockUserByEmail, sanitizeUser } from '../mockData.js';
import { mockMode } from '../utils/mockMode.js';

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, studentId, phone } = req.body;

    if (!name || !email || !password || !studentId || !phone) {
      return res.status(400).json({ message: 'Please fill in all required fields' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    if (mockMode.enabled) {
      if (getMockUserByEmail(email)) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const newUser = {
        _id: `mock-user-${Date.now()}`,
        name,
        email,
        password: await bcrypt.hash(password, 10),
        studentId,
        phone,
        role: 'student',
        status: 'active',
        createdAt: new Date(),
      };

      mockData.users.push(newUser);
      return res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        studentId: newUser.studentId,
        role: newUser.role,
        token: `mock-token-${newUser._id}`,
      });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      studentId,
      phone,
      role: 'student',
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Registration failed' });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (mockMode.enabled) {
      const user = getMockUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        studentId: user.studentId,
        role: user.role,
        token: `mock-token-${user._id}`,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      studentId: user.studentId,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};

export const getCurrentUser = async (req, res) => {
  if (mockMode.enabled) {
    const user = req.user || sanitizeUser(mockData.users[1]);
    return res.json(user);
  }

  const user = await User.findById(req.user._id).select('-password');
  res.json(user);
};
