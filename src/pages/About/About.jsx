import React from "react";
import "./About.css";
import "bootstrap/dist/css/bootstrap.min.css";
import about_img from "../../assets copy/about_img.png";
import about_one from "../../assets copy/about_one.jpg";

const About = () => {
  return (
    <>
      <div className="bg-img-heading py-5">
        <h2 className="text-white text-center">About</h2>
      </div>

      <div className="container py-5">
        {/* Section 1 */}
        <div className="row about-row align-items-center">
          {/* Left: Image */}
          <div className="col-md-5 mb-4 mb-md-0">
            <img
              src={about_img}
              alt="Our Story"
              className="img-fluid rounded shadow-sm"
            />
          </div>

          {/* Right: Text */}
          <div className="col-md-7">
            <h2 className="mb-3 text-dark">Our Story</h2>
            <p>
              Welcome to our store! We are committed to providing you with the
              best products at the most affordable prices. Our mission is to
              deliver quality, trust, and a seamless shopping experience.
            </p>
            <p>
              Whether you're browsing for the latest trends or looking for
              everyday essentials, we've got you covered. We aim to build
              long-lasting relationships with our customers by ensuring customer
              satisfaction and excellent service.
            </p>
            <p>Thank you for choosing us. We’re glad to have you here!</p>
          </div>
        </div>

        {/* Section 2 */}
        <div className="row about-row align-items-center flex-md-row-reverse">
          {/* Right: Image */}
          <div style={{display:"flex" ,justifyContent:"right"}} className="col-md-5 mb-4 mb-md-0">
            <img
              src={about_one}
              alt="Mission"
              className="img-fluid rounded shadow-sm"
            />
          </div>

          {/* Left: Text */}
          <div className="col-md-7">
            <h2 className="mb-3 text-dark">Our Mission</h2>
            <p>
              Our mission is simple: to create a seamless and enjoyable shopping
              experience for every customer. We carefully curate our collection
              to include the best of both quality and affordability.
            </p>
            <p>
              We believe that shopping should be easy, trustworthy, and
              enjoyable — and we’re always here to help you find exactly what
              you need.
            </p>
            <p>We're more than a store — we’re a community. Join us!</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
