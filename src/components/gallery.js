import React, {useState} from 'react';
import ImageCard from './ImageCard';
import '.././assets/css/gallery.css';
import { useEffect } from 'react';

const Gallery = () => {
   
    const imageList = [
        { id: 1, imageUrl: 'http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png' , isSelect: false, isFeatured: true},
        { id: 2, imageUrl: 'http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png' , isSelect: false, isFeatured: false},
        { id: 3, imageUrl: 'http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png' , isSelect: false, isFeatured: false},
        { id: 4, imageUrl: 'http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png' , isSelect: false, isFeatured: false},
        { id: 5, imageUrl: 'http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png' , isSelect: false, isFeatured: false},
        { id: 6, imageUrl: 'http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png' , isSelect: false, isFeatured: false},
        { id: 7, imageUrl: 'http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png' , isSelect: false, isFeatured: false},
        
        // Add more image objects as needed
      ];
      const [images, setImages] = useState(imageList);

        const handleImageClick = (imageId) => {
            const updatedImages = images.map((image) => {
            if (image.id === imageId) {
                image.isSelect = !image.isSelect;
            }
            return image;
            });

            setImages(updatedImages);
            calculateTotal()
        };

    const [selectedCount, setSelectCount] = useState(0);
    const calculateTotal = () => {
		const totalItemCount = images.filter((image) => image.isSelect).length;
		setSelectCount(totalItemCount);
	};
  return (
    <div>
    Total Selected:{selectedCount};
        <div className="gridLayout">
        {images.map((item)=>
            <div key={item.id} className={`${item.isFeatured ? 'child' : ''}`}  onClick={() => handleImageClick(item.id)} >
            <ImageCard isSelect={item.isSelect} imageUrl={item.imageUrl} />
            </div>
            )}
        </div>

    </div>
  )
}

export default Gallery;
