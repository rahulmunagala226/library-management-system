import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Book from '../models/Book.js';
import Borrowing from '../models/Borrowing.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/library-management-system');

    await User.deleteMany({});
    await Book.deleteMany({});
    await Borrowing.deleteMany({});

    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const studentPassword = await bcrypt.hash('Student@123', 10);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@library.com',
      password: adminPassword,
      studentId: 'ADMIN-001',
      phone: '9876543210',
      role: 'admin',
      status: 'active',
    });

    const student = await User.create({
      name: 'Student User',
      email: 'student@library.com',
      password: studentPassword,
      studentId: 'STU-101',
      phone: '9123456780',
      role: 'student',
      status: 'active',
    });

    const books = await Book.insertMany([
      { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', category: 'Programming', publisher: 'Prentice Hall', publicationYear: 2008, description: 'A handbook of agile software craftsmanship for developers and teams.', coverImage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353', totalCopies: 10, availableCopies: 6, rating: 4.8 },
      { title: 'Introduction to Algorithms', author: 'Thomas H. Cormen', isbn: '9780262033848', category: 'Computer Science', publisher: 'MIT Press', publicationYear: 2009, description: 'A comprehensive reference on algorithms and data structures.', coverImage: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f', totalCopies: 8, availableCopies: 5, rating: 4.9 },
      { title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell', isbn: '9780136042594', category: 'Artificial Intelligence', publisher: 'Pearson', publicationYear: 2020, description: 'A comprehensive guide to AI concepts and intelligent systems.', coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765', totalCopies: 5, availableCopies: 3, rating: 4.7 },
      { title: 'Database System Concepts', author: 'Abraham Silberschatz', isbn: '9780078022159', category: 'Database', publisher: 'McGraw Hill', publicationYear: 2011, description: 'Essential database management principles and design.', coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136', totalCopies: 7, availableCopies: 4, rating: 4.6 },
      { title: 'Computer Networking', author: 'James Kurose', isbn: '9780133594140', category: 'Networking', publisher: 'Pearson', publicationYear: 2016, description: 'Networking fundamentals with practical application examples.', coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3', totalCopies: 6, availableCopies: 2, rating: 4.5 },
      { title: 'The Alchemist', author: 'Paulo Coelho', isbn: '9780061120084', category: 'Fiction', publisher: 'HarperOne', publicationYear: 1988, description: 'A magical tale of finding purpose and destiny.', coverImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9', totalCopies: 9, availableCopies: 7, rating: 4.4 },
      { title: 'Discrete Mathematics', author: 'Kenneth Rosen', isbn: '9780073383095', category: 'Mathematics', publisher: 'McGraw Hill', publicationYear: 2012, description: 'A clear introduction to discrete structures and problem solving.', coverImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904', totalCopies: 5, availableCopies: 2, rating: 4.3 },
      { title: 'Fundamentals of Electric Circuits', author: 'Charles Alexander', isbn: '9780073380571', category: 'Electronics', publisher: 'McGraw Hill', publicationYear: 2017, description: 'Concepts and circuit analysis techniques for electronics students.', coverImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789', totalCopies: 6, availableCopies: 4, rating: 4.5 },
      { title: 'Business Communication', author: 'Courtland Bovee', isbn: '9780073529898', category: 'Business', publisher: 'McGraw Hill', publicationYear: 2014, description: 'Strategies for professional and business communication.', coverImage: 'https://images.unsplash.com/photo-1556157382-97eda2d62296', totalCopies: 4, availableCopies: 3, rating: 4.1 },
      { title: 'The Physics of Everyday Phenomena', author: 'Thomas Griffith', isbn: '9780073512144', category: 'Science', publisher: 'McGraw Hill', publicationYear: 2013, description: 'A student-friendly exploration of physics concepts.', coverImage: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d', totalCopies: 5, availableCopies: 4, rating: 4.2 },
      { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', isbn: '9780596517748', category: 'Programming', publisher: 'OReilly', publicationYear: 2008, description: 'A concise look at the best parts of JavaScript.', coverImage: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a', totalCopies: 7, availableCopies: 5, rating: 4.8 },
      { title: 'Machine Learning Yearning', author: 'Andrew Ng', isbn: '9780307474258', category: 'Artificial Intelligence', publisher: 'Manning', publicationYear: 2018, description: 'Concepts and practical advice for building ML systems.', coverImage: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570', totalCopies: 6, availableCopies: 3, rating: 4.6 },
      { title: 'SQL in 10 Minutes', author: 'Ben Forta', isbn: '9780672336070', category: 'Database', publisher: 'Sams Publishing', publicationYear: 2020, description: 'Fast SQL reference for learners and practitioners.', coverImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f', totalCopies: 5, availableCopies: 4, rating: 4.4 },
      { title: 'Computer Architecture', author: 'David Patterson', isbn: '9780124077263', category: 'Computer Science', publisher: 'Morgan Kaufmann', publicationYear: 2017, description: 'A robust overview of computer architecture and organization.', coverImage: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4', totalCopies: 4, availableCopies: 2, rating: 4.7 },
      { title: 'Data Structures and Algorithms', author: 'Narasimha Karumanchi', isbn: '9788192107597', category: 'Computer Science', publisher: 'CareerMonk', publicationYear: 2016, description: 'Practical data structures and problem-solving methods.', coverImage: 'https://images.unsplash.com/photo-1516321165247-4aa89a48be28', totalCopies: 6, availableCopies: 3, rating: 4.5 },
    ]);

    await Borrowing.create({
      user: student._id,
      book: books[0]._id,
      issueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
      dueDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      returnDate: null,
      status: 'overdue',
      fine: 25,
      fineStatus: 'Pending',
    });

    console.log('Database seeded with demo admin, student and books');
    mongoose.connection.close();
  } catch (error) {
    console.error('Seed failed:', error.message);
    process.exit(1);
  }
};

seedData();
