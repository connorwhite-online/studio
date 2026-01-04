'use client';

import React, { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import styles from './ProjectImageGallery.module.css';
import Carousel from '../Carousel';
import Close from '@/app/icons/Close';

interface ProjectImageGalleryProps {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
}

export default function ProjectImageGallery({ 
  images, 
  initialIndex = 0,
  onClose 
}: ProjectImageGalleryProps) {
  const [isClosing, setIsClosing] = useState(false);
  
  // Handle the close animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
    }, 400); // Match the animation duration
  }, [onClose]);
  
  // Handle escape key to close gallery
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    // Prevent body scroll when gallery is open
    document.body.style.overflow = 'hidden';
    
    // Add escape key listener
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className={styles.galleryContainer}>
        <Carousel 
          className={styles.carousel}
          maxHeight="calc(100vh - 200px)"
          initialIndex={initialIndex}
        >
          {images.map((image, index) => (
            <div key={index} className={styles.imageWrapper}>
              <Image
                src={image}
                alt={`Gallery image ${index + 1}`}
                width={1920}
                height={1080}
                className={styles.galleryImage}
                priority={index === initialIndex}
              />
            </div>
          ))}
        </Carousel>

        <button 
          className="navButton"
          onClick={handleClose}
          aria-label="Close gallery"
        >
          <Close size={18} />
          <p>Close</p>
        </button>
      </div>
    </div>
  );
}

