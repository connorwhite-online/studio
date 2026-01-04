'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProjectImage.module.css';
import ProjectImageGallery from '../ProjectImageGallery';

// Import project images manifest
import projectImagesData from '@/public/media/projects/images.json';

interface ProjectImageProps {
  src: string;
  alt: string;
  projectId?: string; // Optional: auto-load all images for this project
  galleryImages?: string[]; // Optional: manually specify gallery images
  priority?: boolean;
}

export default function ProjectImage({ 
  src, 
  alt, 
  projectId,
  galleryImages,
  priority = false 
}: ProjectImageProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  // Determine which images to use for the gallery
  let images: string[] = [];
  
  if (galleryImages && galleryImages.length > 0) {
    // Use manually specified gallery images
    images = galleryImages;
  } else if (projectId && projectImagesData[projectId as keyof typeof projectImagesData]) {
    // Auto-load images from manifest for this project
    images = projectImagesData[projectId as keyof typeof projectImagesData];
  } else {
    // Fallback to single image
    images = [src];
  }

  const handleImageClick = () => {
    // Find the index of the clicked image in the gallery
    const index = images.indexOf(src);
    setInitialIndex(index >= 0 ? index : 0);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <>
      <div className={styles.imageContainer} onClick={handleImageClick}>
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className={styles.image}
          priority={priority}
        />
      </div>

      {isGalleryOpen && (
        <ProjectImageGallery
          images={images}
          initialIndex={initialIndex}
          onClose={handleCloseGallery}
        />
      )}
    </>
  );
}
