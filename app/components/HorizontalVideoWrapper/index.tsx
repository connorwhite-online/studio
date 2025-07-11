'use client';

import React, { useEffect, useState } from 'react';
import styles from './HorizontalVideoWrapper.module.css';
import { MediaItem } from '@/lib/media';
import MediaCarousel from '../MediaCarousel';

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
        console.log('HorizontalVideoWrapper: Fetching media from /api/media');
        let response = await fetch('/api/media');
        
        console.log('HorizontalVideoWrapper: Response status:', response.status);
        console.log('HorizontalVideoWrapper: Response headers:', Object.fromEntries(response.headers.entries()));
        
        if (!response.ok) {
          throw new Error(`Failed to fetch media: ${response.status}`);
        }
        
        let data = await response.json();
        console.log('HorizontalVideoWrapper: API response data:', data);
        
        // If API returns empty results, try direct fetch from static file as fallback
        if (!data.mediaItems || data.mediaItems.length === 0) {
          console.log('HorizontalVideoWrapper: API returned empty results, trying direct fetch from /media/media.json');
          response = await fetch('/media/media.json');
          
          if (!response.ok) {
            throw new Error(`Failed to fetch media from static file: ${response.status}`);
          }
          
          data = await response.json();
          console.log('HorizontalVideoWrapper: Static file response data:', data);
        }
        
        if (!data.mediaItems || data.mediaItems.length === 0) {
          console.error('HorizontalVideoWrapper: No media items found in any source:', data);
          throw new Error('No videos found');
        }
        
        console.log('HorizontalVideoWrapper: Successfully loaded', data.mediaItems.length, 'videos');
        setVideos(data.mediaItems);
      } catch (error) {
        console.error('HorizontalVideoWrapper: Error loading videos:', error);
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