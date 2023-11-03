
import React, { useState } from 'react';
import '.././assets/css/imagecard.css'

const ImageCard = ({ imageUrl, onSelect }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`card image-card m-1 ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`checkbox-overlay ${isHovered ? 'show' : ''}`}>
        <input type="checkbox" className="position-absolute" id="checkbox" />
      </div>
      <img src={imageUrl} className="img-fluid" alt="Image" />
    </div>
  );
};

export default ImageCard;

