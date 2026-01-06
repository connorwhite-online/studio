'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ProjectImage.module.css';
import ProjectImageGallery, { MediaItem } from '../ProjectImageGallery';

// Import project images manifest
import projectImagesData from '@/public/media/projects/images.json';

interface ProjectImageProps {
  src: string;
  alt: string;
  projectId?: string; // Optional: auto-load all images for this project
  galleryImages?: string[]; // Optional: manually specify gallery images (legacy)
  galleryMedia?: MediaItem[]; // Optional: manually specify gallery media (images and videos)
  priority?: boolean;
}

export default function ProjectImage({ 
  src, 
  alt, 
  projectId,
  galleryImages,
  galleryMedia,
  priority = false 
}: ProjectImageProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  // Determine which media to use for the gallery
  let media: MediaItem[] = [];
  
  if (galleryMedia && galleryMedia.length > 0) {
    // Use manually specified gallery media (supports both images and videos)
    media = galleryMedia;
  } else if (galleryImages && galleryImages.length > 0) {
    // Use manually specified gallery images (legacy support)
    media = galleryImages.map(img => ({ type: 'image', src: img }));
  } else if (projectId && projectImagesData[projectId as keyof typeof projectImagesData]) {
    // Auto-load images from manifest for this project
    const images = projectImagesData[projectId as keyof typeof projectImagesData];
    media = images.map(img => ({ type: 'image', src: img }));
  } else {
    // Fallback to single image
    media = [{ type: 'image', src }];
  }

  const handleImageClick = () => {
    // Find the index of the clicked image in the gallery
    const index = media.findIndex(item => item.src === src);
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
          media={media}
          initialIndex={initialIndex}
          onClose={handleCloseGallery}
        />
      )}
    </>
  );
}
