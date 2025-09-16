import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import shopContext from "../../../context/shopContext";
import navbarImg from "../../assets copy/logo-01.png.webp";
import "./Navbar.css";

const Navbar = () => {
  const { token, setToken } = useContext(shopContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
    setToken("");
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);

      if (isHomePage && !isScrolled) {
        document.body.classList.remove("fixed-navbar-active");
      } else {
        document.body.classList.add("fixed-navbar-active");
      }
    };

    if (!isHomePage) {
      setScrolled(true); // Always show white navbar on non-home pages
      document.body.classList.add("fixed-navbar-active");
      return;
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.classList.remove("fixed-navbar-active");
    };
  }, [isHomePage]);

  return (
    <nav
      className={`navbar navbar-expand-lg custom-navbar py-3
    ${isHomePage && !scrolled ? "navbar-absolute" : "fixed-navbar"}
    ${isHomePage && scrolled ? "navbar-scrolled" : ""}
    ${!isHomePage ? "navbar-fixed-white" : ""}
  `}
    >
      <div className="container">
        <Link className="navbar-brand text-dark fw-bold" to="/">
          <img src={navbarImg} alt="Logo" />
        </Link>
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-3">
            <li className="nav-item">
              <Link className="nav-link " to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/collection">
                Shop
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link " to="/cart">
                My Cart
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
