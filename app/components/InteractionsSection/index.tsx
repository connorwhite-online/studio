'use client';
import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './InteractionsSection.module.css';

// Import components
import ProjectCarousel from '../ProjectCarousel';

export default function InteractionsSection() {
  const interactionsRef = useRef<HTMLDivElement>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(() => {
    // Restore carousel index from sessionStorage if available
    if (typeof window !== 'undefined') {
      const savedIndex = sessionStorage.getItem('carouselIndex');
      if (savedIndex !== null) {
        const index = parseInt(savedIndex, 10);
        sessionStorage.removeItem('carouselIndex');
        return index;
      }
    }
    return 0;
  });

  // Set content visible
  useGSAP(() => {
    if (!interactionsRef.current) return;
    
    gsap.set(interactionsRef.current, {
      autoAlpha: 1,
    });
  });

  return (
    <div ref={interactionsRef} className={styles.interactions}>      
      <ProjectCarousel 
        currentIndex={currentCarouselIndex}
        onIndexChange={setCurrentCarouselIndex}
      />
    </div>
  );
} 