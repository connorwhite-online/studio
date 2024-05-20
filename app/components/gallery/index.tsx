'use client';
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './ImageGallery.module.css';

interface GalleryProps {
    images: string[];
    }

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  useEffect(() => {
    gsap.from('.image', {
      opacity: 0,
      y: 50,
      duration: 1,
      stagger: 0.2,
    });
  }, []);

  return (
    <div className={styles.gallery}>
      {images.map((src, index) => (
        <img key={index} src={src} alt={`Image ${index}`} className={styles.image} />
      ))}
    </div>
  );
};

export default Gallery;
