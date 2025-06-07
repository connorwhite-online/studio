'use client';

import React, { useEffect, useState } from 'react';
import styles from './HorizontalVideoWrapper.module.css';
import { MediaItem } from '@/lib/media';
import MediaCarousel from './MediaCarousel';

// Loading indicator component
const LoadingIndicator = () => (
  <div className={styles.loading}>
    <div className={styles.dot} style={{ animation: 'pulse 1.5s infinite 0s' }}></div>
    <div className={styles.dot} style={{ animation: 'pulse 1.5s infinite 0.3s' }}></div>
    <div className={styles.dot} style={{ animation: 'pulse 1.5s infinite 0.6s' }}></div>
  </div>
);

interface HorizontalVideoWrapperProps {
  onError: (message: string) => void;
}

export default function HorizontalVideoWrapper({ 
  onError
}: HorizontalVideoWrapperProps) {
  const [videos, setVideos] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchMediaItems = async () => {
      try {
        const response = await fetch('/api/media');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch media: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.mediaItems || data.mediaItems.length === 0) {
          throw new Error('No videos found');
        }
        
        setVideos(data.mediaItems);
      } catch (error) {
        console.error('Error loading videos:', error);
        onError(error instanceof Error ? error.message : 'Failed to load videos');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMediaItems();
  }, [onError]);

  // Handle video load error
  const handleVideoError = (id: string) => {
    console.error(`Failed to load video with ID: ${id}`);
    setVideoErrors(prev => ({ ...prev, [id]: true }));
  };

  // Show loading indicator
  if (isLoading) {
    return <LoadingIndicator />;
  }
  
  // If no videos, render nothing (parent will handle error state)
  if (videos.length === 0) {
    return null;
  }
  
  return (
    <div className={styles.videoContainer}>
      <MediaCarousel 
        videos={videos}
        onError={handleVideoError}
        videoErrors={videoErrors}
      />
    </div>
  );
} 