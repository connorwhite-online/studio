'use client';

import React, { useState } from 'react';
import styles from './ProjectVideo.module.css';
import ProjectImageGallery, { MediaItem } from '../ProjectImageGallery';

// Import project images manifest
import projectImagesData from '@/public/media/projects/images.json';

interface ProjectVideoProps {
  src: string;
  alt: string;
  projectId?: string; // Optional: auto-load all media for this project
  galleryMedia?: MediaItem[]; // Optional: manually specify gallery media
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
  let media: MediaItem[] = [];
  
  if (galleryMedia && galleryMedia.length > 0) {
    // Use manually specified gallery media
    media = galleryMedia;
  } else if (projectId && projectImagesData[projectId as keyof typeof projectImagesData]) {
    // Auto-load media from manifest for this project
    const images = projectImagesData[projectId as keyof typeof projectImagesData];
    media = images.map(img => {
      // Detect video files by extension
      const isVideo = /\.(mov|mp4|webm|ogg|avi|wmv|flv|mkv)$/i.test(img);
      return { type: isVideo ? 'video' : 'image', src: img } as MediaItem;
    });
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

