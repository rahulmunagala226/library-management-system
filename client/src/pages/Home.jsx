import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Users, LibraryBig, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Books', value: '1200+' },
  { label: 'Available Books', value: '860' },
  { label: 'Registered Users', value: '320' },
  { label: 'Books Issued', value: '480' },
];

const featuredBooks = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', category: 'Programming', cover: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353' },
  { id: 2, title: 'Machine Learning', author: 'Andrew Ng', category: 'AI', cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570' },
  { id: 3, title: 'Database System', author: 'Abraham Silberschatz', category: 'Database', cover: 'https://images.unsplash.com/photo-1544717305-2782549b5136' },
];

const categories = ['Programming', 'Computer Science', 'Artificial Intelligence', 'Database', 'Networking', 'Fiction'];

const steps = [
  'Browse and discover books',
  'Borrow with digital issue tracking',
  'Return on time and manage fines',
];

const features = [
  { title: 'Smart Management', icon: LibraryBig, text: 'Modern tracking for all library records and inventory.' },
  { title: 'User Friendly', icon: Users, text: 'Simple access for both students and administrators.' },
  { title: 'Secure Access', icon: ShieldCheck, text: 'Protected login and role-based authorization.' },
];

const Home = () => (
  <div className="page-shell">
    <section className="hero-section container">
      <motion.div 
        initial={{ opacity: 0, y: 40 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ type: "spring", stiffness: 60, damping: 15 }} 
        className="hero-copy"
      >
        <span className="eyebrow">Digital library platform</span>
        <h1>Smart Library Management System</h1>
        <p>Manage books, users, issues, returns, and fines with a modern digital library experience designed for college campuses.</p>
        <div className="cta-row">
          <Link to="/books" className="primary-btn">
            Explore Books <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="secondary-btn">Login</Link>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.92, y: 20 }} 
        animate={{ opacity: 1, scale: 1, y: 0 }} 
        transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.15 }} 
        className="hero-visual"
      >
        <div className="floating-card"><Sparkles size={16} /> 1200+ Books</div>
        <img src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da" alt="library" />
      </motion.div>
    </section>

    <section className="stats-grid container">
      {stats.map((stat, index) => (
        <motion.div 
          key={stat.label} 
          initial={{ opacity: 0, y: 25 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.1 }} 
          className="stat-card"
        >
          <span className="counter">{stat.value}</span>
          <label>{stat.label}</label>
        </motion.div>
      ))}
    </section>

    <section className="container section-block">
      <div className="section-heading">
        <span className="eyebrow">Featured books</span>
        <h2>Most Popular Titles</h2>
      </div>
      <div className="books-grid three-col">
        {featuredBooks.map((book, index) => (
          <motion.div 
            key={book.id} 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 70, damping: 15, delay: index * 0.1 }}
            className="mini-book-card"
          >
            <img src={book.cover} alt={book.title} />
            <div>
              <p className="category-badge">{book.category}</p>
              <h3>{book.title}</h3>
              <p>{book.author}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="container section-block">
      <div className="section-heading">
        <span className="eyebrow">Categories</span>
        <h2>Truly Diverse Collection</h2>
      </div>
      <div className="chip-grid">
        {categories.map((category, index) => (
          <motion.span 
            key={category} 
            initial={{ opacity: 0, scale: 0.85 }} 
            whileInView={{ opacity: 1, scale: 1 }} 
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 100, damping: 15, delay: index * 0.05 }}
            className="chip"
          >
            {category}
          </motion.span>
        ))}
      </div>
    </section>

    <section className="container section-block">
      <div className="section-heading">
        <span className="eyebrow">How it works</span>
        <h2>Simple and Effective Workflow</h2>
      </div>
      <div className="steps-grid">
        {steps.map((step, index) => (
          <motion.div 
            key={step} 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.1 }} 
            className="step-card"
          >
            <div className="step-number">0{index + 1}</div>
            <p>{step}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <section className="container section-block">
      <div className="section-heading">
        <span className="eyebrow">Why choose us</span>
        <h2>Built for Modern Education</h2>
      </div>
      <div className="feature-grid">
        {features.map(({ title, icon: Icon, text }, index) => (
          <motion.div 
            key={title} 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 80, damping: 15, delay: index * 0.1 }}
            className="feature-card"
          >
            <div className="icon-box"><Icon size={20} /></div>
            <h3>{title}</h3>
            <p>{text}</p>
          </motion.div>
        ))}
      </div>
    </section>

    <motion.section 
      initial={{ opacity: 0, scale: 0.95 }} 
      whileInView={{ opacity: 1, scale: 1 }} 
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 60, damping: 15 }} 
      className="cta-banner container"
    >
      <div>
        <span className="eyebrow">Ready to start?</span>
        <h2>Access your digital library today.</h2>
      </div>
      <Link to="/register" className="primary-btn">Get Started <Sparkles size={18} /></Link>
    </motion.section>
  </div>
);

export default Home;
