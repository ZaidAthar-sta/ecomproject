import React from 'react'
import './About.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import about_img from '../../assets copy/about_img.png' // Replace with your image

const About = () => {
  return (
    <div className="about-container container my-5 d-flex p-0 shadow rounded">
      {/* Left: Image */}
      <div className="about-image">
        <img src={about_img} alt="About Us" />
      </div>

      {/* Right: Text */}
      <div className="about-content d-flex flex-column justify-content-center p-4">
        <h2 className="mb-4">About Us</h2>
        <p>
          Welcome to our store! We are committed to providing you with the best products at the most affordable prices. Our mission is to deliver quality, trust, and a seamless shopping experience.
        </p>
        <p>
          Whether you're browsing for the latest trends or looking for everyday essentials, we've got you covered. We aim to build long-lasting relationships with our customers by ensuring customer satisfaction and excellent service.
        </p>
        <p>
          Thank you for choosing us. We’re glad to have you here!
        </p>
      </div>
    </div>
  )
}

export default About
