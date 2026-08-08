import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { mockData, sanitizeUser } from '../mockData.js';
import { mockMode } from '../utils/mockMode.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      if (mockMode.enabled) {
        const mockUser = mockData.users.find((user) => `mock-token-${user._id}` === token) || mockData.users.find((user) => user._id === token);

        if (!mockUser) {
          return res.status(401).json({ message: 'Not authorized, token failed' });
        }

        req.user = sanitizeUser(mockUser);
        return next();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'library-secret');
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

export default protect;
