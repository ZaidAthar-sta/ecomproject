import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* About */}
          <div className="col-md-4 mb-4">
            <h5>About Us</h5>
            <p>
              We offer premium collections at affordable prices.
              Discover fashion that speaks to your style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/collection" className="footer-link">Collection</Link></li>
              <li><Link to="/about" className="footer-link">About</Link></li>
              {/* <li><Link to="/login" className="footer-link">Login</Link></li> */}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <h5>Contact Us</h5>
            <p>Email: support@yourstore.com</p>
            <p>Phone: +1 (234) 567-890</p>
            <p>Location: New York, USA</p>
          </div>

        </div>

        <hr className="footer-divider" />
        <p className="text-center mb-0">© {new Date().getFullYear()} YourStore. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
