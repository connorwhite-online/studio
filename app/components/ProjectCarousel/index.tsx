'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './ProjectCarousel.module.css';
import ArrowRight from '@/app/icons/ArrowRight';
import ArrowLeft from '@/app/icons/ArrowLeft';
import { projects, Project } from '@/app/data/projects';

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
    // Store current scroll position before navigating
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
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
                    <img 
                      src={project.coverImage} 
                      alt={project.title}
                      className={styles.coverImageImg}
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

