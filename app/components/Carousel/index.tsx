'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './Carousel.module.css';
import ArrowRight from '@/app/icons/ArrowRight';
import ArrowLeft from '@/app/icons/ArrowLeft';

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  slideClassName?: string;
  controlsClassName?: string;
  maxHeight?: string;
  initialIndex?: number;
}

export default function Carousel({ 
  children, 
  className = '',
  slideClassName = '',
  controlsClassName = '',
  maxHeight = '500px',
  initialIndex = 0
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    align: 'center',
    containScroll: 'trimSnaps',
    dragFree: false,
    skipSnaps: false,
    slidesToScroll: 1,
    startIndex: initialIndex
  });
  
  const [selectedIndex, setSelectedIndex] = useState(initialIndex);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [isReady, setIsReady] = useState(false);

  const scrollPrev = useCallback(() => {
    if (!emblaApi) return;
    
    const currentIndex = emblaApi.selectedScrollSnap();
    if (currentIndex === 0) {
      // At first slide, wrap to last slide
      const lastIndex = children.length - 1;
      emblaApi.scrollTo(lastIndex);
    } else {
      emblaApi.scrollPrev();
    }
  }, [emblaApi, children.length]);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    
    const currentIndex = emblaApi.selectedScrollSnap();
    const lastIndex = children.length - 1;
    
    if (currentIndex === lastIndex) {
      // At last slide, wrap to first slide
      emblaApi.scrollTo(0);
    } else {
      emblaApi.scrollNext();
    }
  }, [emblaApi, children.length]);

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
    
    // Jump to initial index immediately without animation
    if (initialIndex > 0) {
      emblaApi.scrollTo(initialIndex, true); // true = instant, no animation
    }
    
    // Fade in after positioning
    setTimeout(() => {
      setIsReady(true);
    }, 50);
  }, [emblaApi, onInit, onSelect, initialIndex]);

  return (
    <div className={`${styles.carousel} ${className}`}>
      <div 
        className={styles.embla} 
        ref={emblaRef}
        style={{ 
          maxHeight,
          opacity: isReady ? 1 : 0,
          transition: isReady ? 'opacity 0.3s ease-in' : 'none'
        }}
      >
        <div className={styles.emblaContainer}>
          {children.map((child, index) => {
            const isActive = index === selectedIndex;
            return (
              <div 
                key={index} 
                className={`${styles.emblaSlide} ${slideClassName}`}
                style={{ maxHeight }}
              >
                <div className={`${styles.slideContent} ${isActive ? styles.slideContentActive : ''}`}>
                  {child}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators and Navigation */}
      <div className={`${styles.controls} ${controlsClassName}`}>
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

