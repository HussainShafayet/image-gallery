
import React, { useState } from 'react';
import '.././assets/css/imagecard.css'

const ImageCard = (props) => {
  const [isHovered, setIsHovered] = useState(false);
  let {isSelect, imageUrl} = props;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`card image-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`${isSelect? 'checkbox-selected': 'checkbox-overlay'} ${isHovered ? 'show' : ''}`}>
        <input type="checkbox" checked={isSelect} readOnly className="position-absolute" id="checkbox" />
      </div>
      <img src={imageUrl} className="img-fluid" alt="Image" />
    </div>
  );
};

export default ImageCard;

