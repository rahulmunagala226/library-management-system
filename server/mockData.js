import bcrypt from 'bcryptjs';

const users = [
  {
    _id: 'admin-user',
    name: 'Admin User',
    email: 'admin@library.com',
    password: bcrypt.hashSync('Admin@123', 10),
    studentId: 'ADMIN-001',
    phone: '9876543210',
    role: 'admin',
    status: 'active',
    createdAt: new Date(),
  },
  {
    _id: 'student-user',
    name: 'Student User',
    email: 'student@library.com',
    password: bcrypt.hashSync('Student@123', 10),
    studentId: 'STU-101',
    phone: '9123456780',
    role: 'student',
    status: 'active',
    createdAt: new Date(),
  },
];

const books = [
  { _id: 'book-1', title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', category: 'Programming', publisher: 'Prentice Hall', publicationYear: 2008, description: 'A handbook of agile software craftsmanship.', coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353', totalCopies: 10, availableCopies: 6, rating: 4.8, createdAt: new Date() },
  { _id: 'book-2', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780262033848', category: 'Computer Science', publisher: 'MIT Press', publicationYear: 2009, description: 'A comprehensive reference on algorithms and data structures.', coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f', totalCopies: 8, availableCopies: 5, rating: 4.9, createdAt: new Date() },
  { _id: 'book-3', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', isbn: '9780136042594', category: 'Artificial Intelligence', publisher: 'Pearson', publicationYear: 2020, description: 'A detailed guide to AI and intelligent systems.', coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765', totalCopies: 5, availableCopies: 3, rating: 4.7, createdAt: new Date() },
  { _id: 'book-4', title: 'Database System Concepts', author: 'Abraham Silberschatz', isbn: '9780078022159', category: 'Database', publisher: 'McGraw Hill', publicationYear: 2011, description: 'Essential database management and design principles.', coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136', totalCopies: 7, availableCopies: 4, rating: 4.6, createdAt: new Date() },
  { _id: 'book-5', title: 'Computer Networking', author: 'James Kurose', isbn: '9780133594140', category: 'Networking', publisher: 'Pearson', publicationYear: 2016, description: 'Networking fundamentals with examples.', coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', totalCopies: 6, availableCopies: 2, rating: 4.5, createdAt: new Date() },
  { _id: 'book-6', title: 'The Alchemist', author: 'Paulo Coelho', isbn: '9780061120084', category: 'Fiction', publisher: 'HarperOne', publicationYear: 1988, description: 'A magical story about finding destiny.', coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', totalCopies: 9, availableCopies: 7, rating: 4.4, createdAt: new Date() },
];

const borrowings = [
  {
    _id: 'borrow-1',
    user: 'student-user',
    book: 'book-1',
    issueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
    dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    returnDate: null,
    status: 'overdue',
    fine: 25,
    fineStatus: 'Pending',
    createdAt: new Date(),
  },
];

const notifications = [
  {
    _id: 'note-1',
    user: 'student-user',
    title: 'Due reminder',
    message: 'Your borrowed book is due soon.',
    type: 'warning',
    read: false,
    createdAt: new Date(),
  },
];

export const mockData = {
  users,
  books,
  borrowings,
  notifications,
};

export const getMockUserByEmail = (email) => mockData.users.find((user) => user.email === email);
export const getMockUserById = (id) => mockData.users.find((user) => user._id === id);
export const getMockBookById = (id) => mockData.books.find((book) => book._id === id);

export const sanitizeUser = (user) => {
  if (!user) return null;
  const { password, ...rest } = user;
  return rest;
};
