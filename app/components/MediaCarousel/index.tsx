'use client';

import React, { useState } from 'react';
import styles from './MediaCarousel.module.css';
import Carousel from '../Carousel';

// Import media data directly - this works at build time and in production
import mediaData from '@/public/media/media.json';

interface MediaItem {
  id: string;
  videoUrl: string;
  title?: string;
}

export default function MediaCarousel() {
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  // Get videos from imported data
  const videos: MediaItem[] = mediaData.mediaItems || [];

  // Sort videos by newest first
  const sortedVideos = videos.sort((a: MediaItem, b: MediaItem) => b.id.localeCompare(a.id));

  // Function to get MIME type based on file extension
  const getVideoType = (url: string): string => {
    if (url.endsWith('.mp4')) return 'video/mp4';
    if (url.endsWith('.mov')) return 'video/quicktime';
    if (url.endsWith('.webm')) return 'video/webm';
    if (url.endsWith('.ogg')) return 'video/ogg';
    return '';
  };

  // Enhanced video error handler with better debugging
  const handleVideoError = (item: MediaItem, event: any) => {
    console.error(`Failed to load video: ${item.title} (${item.id})`, {
      url: item.videoUrl,
      error: event.target?.error,
      networkState: event.target?.networkState,
      readyState: event.target?.readyState
    });
    
    // Update local video errors state to show fallback UI for this video
    setVideoErrors(prev => ({ ...prev, [item.id]: true }));
  };

  return (
    <Carousel className={styles.mediaCarousel}>
      {sortedVideos.map((item) => {
        const videoType = getVideoType(item.videoUrl);
        return (
          <div key={item.id} className={styles.videoCard}>
            {!videoErrors[item.id] ? (
              <video
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                onError={(event) => handleVideoError(item, event)}
                onLoadStart={() => console.log(`Loading video: ${item.title}`)}
                onCanPlay={() => console.log(`Video ready: ${item.title}`)}
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
    </Carousel>
  );
}
