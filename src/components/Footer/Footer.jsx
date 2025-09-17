import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import shopContext from "../../../context/shopContext";



const Footer = () => {
  const { token, setToken } = useContext(shopContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    setToken("");
    navigate("/login");
  };

  return (
    <footer className="footer text-white pt-5 pb-3">
      <div className="container">
        <div className="row">
          {/* About */}
          <div className="col-md-3 mb-4">
            <h5>About Us</h5>
            <p>
              We offer premium collections at affordable prices. Discover
              fashion that speaks to your style.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-3 mb-4">
            <h5>Categories</h5>
            <ul className="list-unstyled categories-list">
              <li>
                <Link to="/product/list" className="footer-link">
                  Shop Now
                </Link>
              </li>
              <li>
                <Link to="/collection" className="footer-link">
                  Collection
                </Link>
              </li>
              <li>
                <Link to="/cart" className="footer-link">
                  My Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-md-3 mb-4">
            <h5>Contact Us</h5>
            <p>Email: support@yourstore.com</p>
            <p>Phone: +1 (234) 567-890</p>
            <p>Location: New York, USA</p>
          </div>
          <div className="col-md-3">
            <h5>Stay Connected</h5>
            <p>Follow us on social media for latest updates and offers.</p>
            <div className="social-icons">
              <a href="https://facebook.com" className="me-3">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="https://instagram.com" className="me-3">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="https://twitter.com" className="">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
            <button
              onClick={handleLogout}
              className="btn mt-3 btn-dark text-white logout-btn"
            >
              Logout
            </button>
          </div>
        </div>

        <hr className="footer-divider" />
        <p className="text-center mb-0">
          © {new Date().getFullYear()} YourStore. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
