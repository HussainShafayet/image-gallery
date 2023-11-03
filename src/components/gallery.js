import React from 'react';
import ImageCard from './ImageCard';

export default function Gallery() {
  return (
    <div>
        <ImageCard imageUrl="http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png" onSelect={() => console.log('Selected!')} />

        <ImageCard imageUrl="http://codeskulptor-assets.commondatastorage.googleapis.com/assets_clock_background.png" onSelect={() => console.log('Selected!')} />

    </div>
  )
}
