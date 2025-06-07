'use client';
import React, { useRef, useEffect, useState, Suspense } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './InteractionsSection.module.css';
import dynamic from 'next/dynamic';

// Import VideoSkeleton and ErrorState from components
import VideoSkeleton from '../VideoSkeleton';
import ErrorState from '../ErrorState';

// Import the HorizontalVideoWrapper component dynamically to work with Suspense
const HorizontalVideoWrapper = dynamic(() => import('../HorizontalVideoWrapper'), {
  suspense: true,
});

export default function InteractionsSection() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forcingRefresh, setForcingRefresh] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const interactionsRef = useRef<HTMLDivElement>(null);

  // Initial setup
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // Handle errors from VideoWrapper
  const handleError = (message: string) => {
    setError(message);
  };

  // Set content visible (no animation)
  useGSAP(() => {
    if (!interactionsRef.current || loading) return;
    
    gsap.set(interactionsRef.current, {
      autoAlpha: 1,
    });
  }, { dependencies: [loading, refreshKey] });

  const handleRefreshClick = () => {
    setError(null);
    setForcingRefresh(true);
    setRefreshKey(prev => prev + 1);
    
    setTimeout(() => {
      setForcingRefresh(false);
    }, 1000);
  };

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <ErrorState message={error} />
      </div>
    );
  }

  return (
    <div ref={interactionsRef} className={styles.interactions}>      
      <Suspense fallback={<VideoSkeleton />}>
        <HorizontalVideoWrapper 
          key={refreshKey} 
          onError={handleError} 
        />
      </Suspense>
    </div>
  );
} 