import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <h3>Smart Library</h3>
        <p>Empowering students with the right books, resources, and knowledge.</p>
      </div>
      <div>
        <h4>Quick Links</h4>
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/books">Books</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </div>
      <div>
        <h4>Contact</h4>
        <ul>
          <li>support@library.edu</li>
          <li>+91 98765 43210</li>
        </ul>
      </div>
    </div>
  </footer>
);

export default Footer;
