import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css";
import heroImg1 from "../../assets copy/hero_img_c.webp";
import heroImg2 from "../../assets copy/heo_img_c2.jpg";
import heroImg3 from "../../assets copy/hero_img_c3.jpg";
import { Link } from "react-router-dom";

const Hero = () => {
  const slides = [
    {
      id: 1,
      title: "Latest Arrivals",
      subtitle: "Our Bestsellers",
      description:
        "Discover the newest trends and timeless pieces curated just for you.",
      image: heroImg1,
    },
    {
      id: 2,
      title: "Curated Just For You",
      subtitle: "New Collections",
      description:
        "Style that speaks louder. Step into our exclusive collections.",
      image: heroImg2,
    },
    {
      id: 3,
      title: "Timeless Elegance",
      subtitle: "Exclusive Designs",
      description: "Make a statement with our premium, handcrafted pieces.",
      image: heroImg3,
    },
  ];

  return (
    <section className="hero-section ">
      {/* <div className="container"> */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="5000"
      >
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={slide.id}
            >
              <div
                className="hero-slide"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  minHeight: "90vh", // Full viewport height
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="col-md-6 hero-content text-dark p-4">
                  <div className="container">
                    <h5 className="text-uppercase">{slide.subtitle}</h5>
                    <h1 className="display-4  fw-bold">{slide.title}</h1>
                    <p className="lead">{slide.description}</p>
                    <Link
                      to={"/collection"}
                      className="shop-btn btn text-white"
                    >
                      SHOP NOW
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next "
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* </div> */}
    </section>
  );
};

export default Hero;
