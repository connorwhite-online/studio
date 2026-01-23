'use client';

import React, { useEffect, useCallback, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styles from './ProjectImageGallery.module.css';
import Carousel from '../Carousel';
import Close from '@/app/icons/Close';
import MediaSkeleton from '../MediaSkeleton';

export type MediaItem = {
  type: 'image' | 'video';
  src: string;
};

interface ProjectImageGalleryProps {
  images?: string[]; // Legacy support
  media?: MediaItem[]; // New format supporting both images and videos
  initialIndex?: number;
  onClose: (finalIndex?: number) => void;
  onIndexChange?: (index: number) => void;
}

export default function ProjectImageGallery({ 
  images, 
  media,
  initialIndex = 0,
  onClose,
  onIndexChange
}: ProjectImageGalleryProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [loadedMedia, setLoadedMedia] = useState<Set<number>>(new Set());
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  
  // Memoize the carousel index change handler to prevent unnecessary re-renders
  const handleCarouselIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
    if (onIndexChange) {
      onIndexChange(index);
    }
  }, [onIndexChange]);
  
  // Convert images array to media format for backward compatibility
  const mediaItems: MediaItem[] = useMemo(() => 
    media || (images?.map(src => ({ type: 'image' as const, src })) ?? []),
    [media, images]
  );

  // Check if initial media is already loaded (cached)
  useEffect(() => {
    mediaItems.forEach((item, index) => {
      if (item.type === 'image') {
        const img = new window.Image();
        img.onload = () => {
          setLoadedMedia(prev => new Set(prev).add(index));
        };
        img.onerror = () => {
          setLoadedMedia(prev => new Set(prev).add(index));
        };
        img.src = item.src;
        
        if (img.complete) {
          setLoadedMedia(prev => new Set(prev).add(index));
        }
      } else {
        // For videos, check if they're already loaded
        const video = document.createElement('video');
        video.onloadeddata = () => {
          setLoadedMedia(prev => new Set(prev).add(index));
        };
        video.onerror = () => {
          setLoadedMedia(prev => new Set(prev).add(index));
        };
        video.src = item.src;
        video.preload = 'metadata';
        
        if (video.readyState >= 2) {
          setLoadedMedia(prev => new Set(prev).add(index));
        }
      }
    });
  }, [mediaItems]);
  
  // Handle the close animation
  const handleClose = useCallback(() => {
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      // Call onIndexChange with current index before closing
      if (onIndexChange) {
        onIndexChange(currentIndex);
      }
      // Pass the final index to onClose callback
      onClose(currentIndex);
    }, 400); // Match the animation duration
  }, [onClose, onIndexChange, currentIndex]);
  
  // Handle escape key to close gallery
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Prevent body scroll when gallery is open
    document.body.style.overflow = 'hidden';
    
    // Add escape key listener
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown, mounted]);

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const galleryContent = (
    <div 
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`} 
      onClick={handleBackdropClick}
    >
      <div className={styles.galleryContainer}>
        <Carousel 
          className={styles.carousel}
          maxHeight="calc(100vh - 200px)"
          initialIndex={initialIndex}
          onIndexChange={handleCarouselIndexChange}
        >
          {mediaItems.map((item, index) => (
            <div key={index} className={styles.imageWrapper}>
              {!loadedMedia.has(index) && (
                <div className={styles.skeletonWrapper}>
                  <MediaSkeleton />
                </div>
              )}
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={`Gallery image ${index + 1}`}
                  width={1920}
                  height={1080}
                  className={styles.galleryImage}
                  priority={index === initialIndex}
                  onLoadingComplete={() => setLoadedMedia(prev => new Set(prev).add(index))}
                  onLoad={() => setLoadedMedia(prev => new Set(prev).add(index))}
                  onError={() => setLoadedMedia(prev => new Set(prev).add(index))}
                  style={{ display: loadedMedia.has(index) ? 'block' : 'none' }}
                />
              ) : (
                <video
                  src={item.src}
                  className={styles.galleryImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload={index === initialIndex ? "auto" : "metadata"}
                  onLoadedData={() => setLoadedMedia(prev => new Set(prev).add(index))}
                  onCanPlay={() => setLoadedMedia(prev => new Set(prev).add(index))}
                  onError={() => setLoadedMedia(prev => new Set(prev).add(index))}
                  style={{ display: loadedMedia.has(index) ? 'block' : 'none' }}
                >
                  Your browser does not support the video tag.
                </video>
              )}
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

  if (!mounted) return null;

  return createPortal(galleryContent, document.body);
}

