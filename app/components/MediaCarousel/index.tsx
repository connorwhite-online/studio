'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './MediaCarousel.module.css';
import ArrowRight from '@/app/icons/ArrowRight';
import ArrowLeft from '@/app/icons/ArrowLeft';

// Import media data directly - this works at build time and in production
import mediaData from '@/public/media/media.json';

interface MediaItem {
  id: string;
  videoUrl: string;
  title?: string;
}

export default function MediaCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    skipSnaps: false,
    slidesToScroll: 1
  });
  
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [videoErrors, setVideoErrors] = useState<Record<string, boolean>>({});

  // Get videos from imported data
  const videos: MediaItem[] = mediaData.mediaItems || [];

  // Sort videos by newest first
  const sortedVideos = videos.sort((a: MediaItem, b: MediaItem) => b.id.localeCompare(a.id));

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    
    const currentIndex = emblaApi.selectedScrollSnap();
    if (currentIndex === 0) {
      // At first slide, wrap to last slide with visual transition from left
      const lastIndex = sortedVideos.length - 1;
      emblaApi.scrollTo(lastIndex);
    } else {
      emblaApi.scrollPrev();
    }
  }, [emblaApi, sortedVideos.length]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    
    const currentIndex = emblaApi.selectedScrollSnap();
    const lastIndex = sortedVideos.length - 1;
    
    if (currentIndex === lastIndex) {
      // At last slide, wrap to first slide with visual transition from right
      emblaApi.scrollTo(0);
    } else {
      emblaApi.scrollNext();
    }
  }, [emblaApi, sortedVideos.length]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

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
    <div className={styles.carousel}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {sortedVideos.map((item, index) => {
            const videoType = getVideoType(item.videoUrl);
            const isActive = index === selectedIndex;
            return (
              <div key={item.id} className={styles.emblaSlide}>
                <div className={`${styles.videoCard} ${isActive ? styles.videoCardActive : ''}`}>
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
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators and Navigation */}
      <div className={styles.controls}>
        <button
          className={styles.navButton}
          onClick={scrollPrev}
          aria-label="Previous slide"
        >
          <ArrowLeft />
        </button>

        <div className={styles.indicators}>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${
                index === selectedIndex ? styles.indicatorActive : ''
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          className={styles.navButton}
          onClick={scrollNext}
          aria-label="Next slide"
        >
            <ArrowRight />
        </button>
      </div>
    </div>
  );
} 