'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './InteractionsSection.module.css';

// Import components
import MediaCarousel from '../MediaCarousel';

export default function InteractionsSection() {
  const interactionsRef = useRef<HTMLDivElement>(null);

  // Set content visible
  useGSAP(() => {
    if (!interactionsRef.current) return;
    
    gsap.set(interactionsRef.current, {
      autoAlpha: 1,
    });
  });

  return (
    <div ref={interactionsRef} className={styles.interactions}>      
      <MediaCarousel />
    </div>
  );
} 