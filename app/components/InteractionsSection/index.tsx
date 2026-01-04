'use client';
import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './InteractionsSection.module.css';

// Import components
import ProjectCarousel from '../ProjectCarousel';

export default function InteractionsSection() {
  const interactionsRef = useRef<HTMLDivElement>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

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