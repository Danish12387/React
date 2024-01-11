import React, { useState } from 'react';
import './index.css';


const ImageSlider = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="image_slider">
      <button onClick={prevImage}>&lt;</button>
      <img
        src={images[currentImageIndex]}
        alt={`Image ${currentImageIndex + 1}`}
      />
      <button onClick={nextImage}>&gt;</button>
    </div>
  );
};

export default ImageSlider;
