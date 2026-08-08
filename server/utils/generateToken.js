import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'library-secret', {
    expiresIn: '30d',
  });
};

export default generateToken;
