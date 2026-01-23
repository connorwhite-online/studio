'use client';

import React, { useEffect, useState } from 'react';
import ArrowUp from '@/app/icons/ArrowUp';
import styles from './ScrollToTop.module.css';

interface ScrollToTopProps {
  scrollContainerRef: React.RefObject<HTMLDivElement>;
  threshold?: number;
}

export default function ScrollToTop({ scrollContainerRef, threshold = 200 }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const scrollHeight = scrollContainer.scrollHeight;
      const clientHeight = scrollContainer.clientHeight;
      
      // Check if scrolled past threshold
      setIsVisible(scrollTop > threshold);
      
      // Check if at bottom (with 20px tolerance)
      const isBottom = scrollTop + clientHeight >= scrollHeight - 20;
      setIsAtBottom(isBottom);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, [scrollContainerRef, threshold]);

  const scrollToTop = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      className={`${styles.scrollToTop} ${isVisible ? styles.visible : ''} ${isAtBottom ? styles.atBottom : ''}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
