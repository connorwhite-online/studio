'use client';

import React, { useState } from 'react';
import styles from './ProjectVideo.module.css';
import ProjectImageGallery from '../ProjectImageGallery';

interface ProjectVideoProps {
  src: string;
  alt: string;
  projectId?: string; // Optional: for future integration with media manifest
  galleryMedia?: Array<{type: 'image' | 'video', src: string}>; // Optional: manually specify gallery media
  priority?: boolean;
}

export default function ProjectVideo({ 
  src, 
  alt, 
  projectId,
  galleryMedia,
  priority = false 
}: ProjectVideoProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  // Determine which media to use for the gallery
  let media: Array<{type: 'image' | 'video', src: string}> = [];
  
  if (galleryMedia && galleryMedia.length > 0) {
    // Use manually specified gallery media
    media = galleryMedia;
  } else {
    // Fallback to single video
    media = [{type: 'video', src}];
  }

  const handleVideoClick = () => {
    // Find the index of the clicked video in the gallery
    const index = media.findIndex(item => item.src === src);
    setInitialIndex(index >= 0 ? index : 0);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  return (
    <>
      <div className={styles.videoContainer} onClick={handleVideoClick}>
        <video
          src={src}
          className={styles.video}
          autoPlay
          loop
          muted
          playsInline
          preload={priority ? "auto" : "metadata"}
        >
          Your browser does not support the video tag.
        </video>
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

