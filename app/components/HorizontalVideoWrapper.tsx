'use client';

import React, { useEffect, useState, useRef } from 'react';
import styles from './HorizontalVideoWrapper.module.css';
import { MediaItem } from '@/lib/media';

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
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

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
        videoRefs.current = Array(data.mediaItems.length).fill(null);
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
  
  // Function to get MIME type based on file extension
  const getVideoType = (url: string): string => {
    if (url.endsWith('.mp4')) return 'video/mp4';
    if (url.endsWith('.mov')) return 'video/quicktime';
    if (url.endsWith('.webm')) return 'video/webm';
    if (url.endsWith('.ogg')) return 'video/ogg';
    return '';
  };
  
  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoScroll}>
        {videos
          .sort((a, b) => b.id.localeCompare(a.id)) // Sort by newest first
          .map((item, index) => {
            const videoType = getVideoType(item.videoUrl);
            return (
              <div 
                key={item.id} 
                className={styles.videoCard}
              >
                {!videoErrors[item.id] ? (
                  <video
                    ref={el => videoRefs.current[index] = el}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="metadata"
                    onError={() => handleVideoError(item.id)}
                  >
                    <source src={item.videoUrl} type={videoType} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <div className={styles.videoError}>
                    <p>Video could not be loaded</p>
                    <p className={styles.videoErrorPath}>{item.videoUrl}</p>
                  </div>
                )}
                {item.title && (
                  <div className={styles.videoTitle}>
                    {item.title}
                  </div>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
} 