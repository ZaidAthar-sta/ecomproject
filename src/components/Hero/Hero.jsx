import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Hero.css';
import heroImg from '../../assets copy/hero_img.png'; 

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Text Content */}
          <div className="col-md-6 text-white hero-content">
            <h5 className="text-uppercase">Our Bestsellers</h5>
            <h1 className="display-4 fw-bold">Latest Arrivals</h1>
            <p className="lead">Discover the newest trends and timeless pieces curated just for you.</p>
            <a href="/collection" className="btn btn-success mt-3">Shop Now</a>
          </div>

          {/* Right Image */}
          <div className="col-md-6 text-center">
            <img
              src={heroImg}
              alt="Hero"
              className="img-fluid hero-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
