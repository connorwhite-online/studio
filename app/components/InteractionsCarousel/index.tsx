'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './InteractionsCarousel.module.css';
import ArrowRight from '@/app/icons/ArrowRight';
import ArrowLeft from '@/app/icons/ArrowLeft';
import MediaSkeleton from '../MediaSkeleton';
import ProjectImageGallery, { MediaItem as GalleryMediaItem } from '../ProjectImageGallery';

interface MediaItem {
  id: string;
  videoUrl: string;
  title: string;
}

interface InteractionsCarouselProps {
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  mediaItems: MediaItem[];
}

export default function InteractionsCarousel({ 
  currentIndex: externalIndex,
  onIndexChange,
  mediaItems
}: InteractionsCarouselProps) {
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
  const [titleKey, setTitleKey] = useState(0); // Key to force title re-render for animation
  const [loadedVideos, setLoadedVideos] = useState<Set<number>>(new Set());
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);
  const [galleryCurrentIndex, setGalleryCurrentIndex] = useState(0);
  const lastNotifiedIndexRef = useRef<number | null>(null); // Track last index we notified parent about

  // Check if videos are already loaded (cached)
  useEffect(() => {
    mediaItems.forEach((item, index) => {
      const video = document.createElement('video');
      video.oncanplaythrough = () => {
        setLoadedVideos(prev => new Set(prev).add(index));
      };
      video.onerror = () => {
        // If video fails to load, still mark as "loaded" to hide skeleton
        setLoadedVideos(prev => new Set(prev).add(index));
      };
      video.src = item.videoUrl;
      video.preload = 'metadata';
      
      // Check if video is already cached
      if (video.readyState >= 2) {
        setLoadedVideos(prev => new Set(prev).add(index));
      }
    });
  }, [mediaItems]);

  // Sync with external index if provided
  // Only sync if external index is different from both selectedIndex AND what we last notified
  // This prevents circular updates while still allowing external control
  useEffect(() => {
    if (externalIndex !== undefined && emblaApi && externalIndex !== selectedIndex) {
      // Don't sync if this is the index we just notified the parent about (circular update)
      if (lastNotifiedIndexRef.current !== null && externalIndex === lastNotifiedIndexRef.current) {
        // This is a circular update from our own onIndexChange, ignore it
        return;
      }
      
      // This is a genuine external change, sync to it
      emblaApi.scrollTo(externalIndex);
    }
  }, [externalIndex, emblaApi, selectedIndex]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    
    const currentIndex = emblaApi.selectedScrollSnap();
    if (currentIndex === 0) {
      const lastIndex = mediaItems.length - 1;
      emblaApi.scrollTo(lastIndex);
    } else {
      emblaApi.scrollPrev();
    }
  }, [emblaApi, mediaItems.length]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    
    const currentIndex = emblaApi.selectedScrollSnap();
    const lastIndex = mediaItems.length - 1;
    
    if (currentIndex === lastIndex) {
      emblaApi.scrollTo(0);
    } else {
      emblaApi.scrollNext();
    }
  }, [emblaApi, mediaItems.length]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    setTitleKey(prev => prev + 1); // Trigger title animation
    
    if (onIndexChange) {
      // Track that we're notifying the parent about this index
      lastNotifiedIndexRef.current = newIndex;
      onIndexChange(newIndex);
      // Clear the tracking after a short delay to allow for the circular update to complete
      setTimeout(() => {
        lastNotifiedIndexRef.current = null;
      }, 100);
    }
  }, [onIndexChange]);

  // Play active video and pause others
  useEffect(() => {
    const playActiveVideo = async () => {
      videoRefs.current.forEach((video, index) => {
        if (video) {
          if (index === selectedIndex) {
            // Only try to play if video is ready
            if (video.readyState >= 2) {
              video.play().catch(() => {
                // Autoplay might be blocked by browser policy
              });
            }
          } else {
            video.pause();
          }
        }
      });
    };

    // Small delay to ensure DOM is updated
    const timeoutId = setTimeout(playActiveVideo, 100);
    return () => clearTimeout(timeoutId);
  }, [selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('reInit', onInit);
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  // Convert mediaItems to gallery format
  const galleryMedia: GalleryMediaItem[] = mediaItems.map(item => ({
    type: 'video' as const,
    src: item.videoUrl
  }));

  // Handle interaction click to open gallery
  const handleInteractionClick = (index: number) => {
    if (index === selectedIndex) {
      setGalleryInitialIndex(index);
      setGalleryCurrentIndex(index); // Initialize current index
      setIsGalleryOpen(true);
    }
  };

  const handleCloseGallery = (finalIndex?: number) => {
    setIsGalleryOpen(false);
    // Use the finalIndex passed from gallery, or fall back to galleryCurrentIndex
    const indexToUse = finalIndex !== undefined ? finalIndex : galleryCurrentIndex;
    
    // Update the carousel to reflect the gallery's current index
    if (indexToUse !== selectedIndex && emblaApi) {
      setSelectedIndex(indexToUse);
      emblaApi.scrollTo(indexToUse);
      if (onIndexChange) {
        lastNotifiedIndexRef.current = indexToUse;
        onIndexChange(indexToUse);
        setTimeout(() => {
          lastNotifiedIndexRef.current = null;
        }, 100);
      }
    }
  };

  const handleGalleryIndexChange = (index: number) => {
    setGalleryCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {mediaItems.map((item, index) => {
            const isActive = index === selectedIndex;
            return (
              <div key={item.id} className={styles.emblaSlide}>
                <div className={styles.maxSizeContainer}>
                  <div 
                    className={`${styles.interactionCard} ${isActive ? styles.interactionCardActive : ''}`}
                    onClick={() => handleInteractionClick(index)}
                    style={{ cursor: isActive ? 'pointer' : 'default' }}
                  >
                    <div className={styles.videoContainer}>
                      {!loadedVideos.has(index) && (
                        <div className={styles.skeletonWrapper}>
                          <MediaSkeleton className={styles.fullSizeSkeleton} />
                        </div>
                      )}
                      <video 
                        ref={(el) => {
                          videoRefs.current[index] = el;
                        }}
                        src={item.videoUrl}
                        className={styles.video}
                        autoPlay={isActive}
                        loop
                        muted
                        playsInline
                        preload={isActive ? "auto" : "metadata"}
                        style={{ display: loadedVideos.has(index) ? 'block' : 'none', position: 'relative', zIndex: 2 }}
                        onCanPlayThrough={() => {
                          setLoadedVideos(prev => new Set(prev).add(index));
                          // Try to play if this is the active video
                          if (index === selectedIndex && videoRefs.current[index]) {
                            videoRefs.current[index]?.play().catch(() => {});
                          }
                        }}
                        onLoadedData={() => {
                          // Also try to play when data is loaded
                          if (index === selectedIndex && videoRefs.current[index]) {
                            videoRefs.current[index]?.play().catch(() => {});
                          }
                        }}
                        onError={() => setLoadedVideos(prev => new Set(prev).add(index))}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interaction Title - positioned below carousel */}
      <div className={styles.titleContainer}>
        <h3 
          key={titleKey} 
          className={styles.interactionTitle}
        >
          {mediaItems[selectedIndex]?.title || ''}
        </h3>
      </div>

      {/* Indicators and Navigation */}
      <div className={styles.controls}>
        <button
          className={styles.navButton}
          onClick={scrollPrev}
          aria-label="Previous interaction"
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
              aria-label={`Go to interaction ${index + 1}`}
            />
          ))}
        </div>

        <button
          className={styles.navButton}
          onClick={scrollNext}
          aria-label="Next interaction"
        >
          <ArrowRight />
        </button>
      </div>

      {/* Gallery Overlay */}
      {isGalleryOpen && (
        <ProjectImageGallery
          media={galleryMedia}
          initialIndex={galleryInitialIndex}
          onClose={handleCloseGallery}
          onIndexChange={handleGalleryIndexChange}
        />
      )}
    </div>
  );
}
