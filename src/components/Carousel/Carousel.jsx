import React, { useState, useEffect } from "react";
import "./Carousel.css"; // Import the styles

const Carousel = ({ images, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Automatically change slides at the given interval
  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer); // Clear timer on component unmount
  }, [interval, images.length]);

  return (
    <div className="carousel">
      <div
        className="carousel-slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index + 1}`}
            className="carousel-image"
          />
        ))}
      </div>
      {/* Optional: Navigation buttons */}
      <button className="carousel-button prev" onClick={() => setCurrentIndex((currentIndex - 1 + images.length) % images.length)}>
        &#10094;
      </button>
      <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button>
    </div>
  );
};

export default Carousel;