'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './ProjectCarousel.module.css';
import ArrowRight from '@/app/icons/ArrowRight';
import ArrowLeft from '@/app/icons/ArrowLeft';
import { projects, Project } from '@/app/data/projects';
import MediaSkeleton from '../MediaSkeleton';

interface ProjectCarouselProps {
  currentIndex?: number;
  onIndexChange?: (index: number) => void;
}

export default function ProjectCarousel({ 
  currentIndex: externalIndex,
  onIndexChange 
}: ProjectCarouselProps) {
  const router = useRouter();
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
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  // Check if images are already loaded (cached)
  useEffect(() => {
    projects.forEach((project, index) => {
      const img = new window.Image();
      img.onload = () => {
        setLoadedImages(prev => new Set(prev).add(index));
      };
      img.onerror = () => {
        // If image fails to load, still mark as "loaded" to hide skeleton
        setLoadedImages(prev => new Set(prev).add(index));
      };
      img.src = project.coverImage;
      
      // Check if image is already cached
      if (img.complete) {
        setLoadedImages(prev => new Set(prev).add(index));
      }
    });
  }, []);

  // Sync with external index if provided
  useEffect(() => {
    if (externalIndex !== undefined && emblaApi && externalIndex !== selectedIndex) {
      emblaApi.scrollTo(externalIndex);
    }
  }, [externalIndex, emblaApi, selectedIndex]);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    
    const currentIndex = emblaApi.selectedScrollSnap();
    if (currentIndex === 0) {
      const lastIndex = projects.length - 1;
      emblaApi.scrollTo(lastIndex);
    } else {
      emblaApi.scrollPrev();
    }
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    
    const currentIndex = emblaApi.selectedScrollSnap();
    const lastIndex = projects.length - 1;
    
    if (currentIndex === lastIndex) {
      emblaApi.scrollTo(0);
    } else {
      emblaApi.scrollNext();
    }
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    const newIndex = emblaApi.selectedScrollSnap();
    setSelectedIndex(newIndex);
    setTitleKey(prev => prev + 1); // Trigger title animation
    if (onIndexChange) {
      onIndexChange(newIndex);
    }
  }, [onIndexChange]);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  const handleProjectClick = (projectId: string) => {
    // Store current scroll position and carousel index before navigating
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
      sessionStorage.setItem('carouselIndex', selectedIndex.toString());
    }
    router.push(`/projects/${projectId}`);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.embla} ref={emblaRef}>
        <div className={styles.emblaContainer}>
          {projects.map((project, index) => {
            const isActive = index === selectedIndex;
            return (
              <div key={project.id} className={styles.emblaSlide}>
                <div 
                  className={`${styles.projectCard} ${isActive ? styles.projectCardActive : ''}`}
                  onClick={() => isActive && handleProjectClick(project.id)}
                  style={{ cursor: isActive ? 'pointer' : 'default' }}
                >
                  <div className={styles.coverImage}>
                    {!loadedImages.has(index) && (
                      <div className={styles.skeletonWrapper}>
                        <MediaSkeleton className={styles.fullSizeSkeleton} />
                      </div>
                    )}
                    <img 
                      src={project.coverImage} 
                      alt={project.title}
                      className={styles.coverImageImg}
                      style={{ display: loadedImages.has(index) ? 'block' : 'none', position: 'relative', zIndex: 2 }}
                      onLoad={() => setLoadedImages(prev => new Set(prev).add(index))}
                      onError={() => setLoadedImages(prev => new Set(prev).add(index))}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Project Title - positioned below carousel */}
      <div className={styles.titleContainer}>
        <h3 
          key={titleKey} 
          className={styles.projectTitle}
        >
          {projects[selectedIndex]?.title || ''}
        </h3>
      </div>

      {/* Indicators and Navigation */}
      <div className={styles.controls}>
        <button
          className={styles.navButton}
          onClick={scrollPrev}
          aria-label="Previous project"
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
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        <button
          className={styles.navButton}
          onClick={scrollNext}
          aria-label="Next project"
        >
          <ArrowRight />
        </button>
      </div>
    </div>
  );
}

