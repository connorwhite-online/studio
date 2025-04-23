'use client';
import React, { useRef, useEffect, useState, Suspense } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './interactions.module.css';
import VideoSkeleton from './VideoSkeleton';
import ErrorState from './ErrorState';
import dynamic from 'next/dynamic';

// Import the VideoWrapper component dynamically to work with Suspense
const VideoWrapper = dynamic(() => import('./VideoWrapper'), {
  suspense: true,
});

export default function Interactions() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [forcingRefresh, setForcingRefresh] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // Used to force remount of VideoWrapper
  const interactionsRef = useRef<HTMLDivElement>(null);
  const interactionsTL = useRef<gsap.core.Timeline>();
  const loadingRef = useRef<HTMLDivElement>(null);

  // Initial animation setup
  useEffect(() => {
    // Short timeout to allow the UI to render before showing content
    setTimeout(() => {
      setLoading(false);
    }, 300);
  }, []);

  // Handle errors from VideoWrapper
  const handleError = (message: string) => {
    setError(message);
  };

  // Loading animation
  useGSAP(() => {
    if ((loading) && loadingRef.current) {
      gsap.to(loadingRef.current.children, {
        y: -10,
        opacity: 1,
        stagger: 0.1,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true
      });
    }
  }, { dependencies: [loading] });

  // Main content animation
  useGSAP(() => {
    if (!interactionsRef.current || loading) return;
    
    // Add a short delay to ensure video cards are rendered
    setTimeout(() => {
      const videoCards = document.querySelectorAll(`.${styles.videoCard}`);
      
      // Only run animation if video cards exist
      if (videoCards.length > 0) {
        interactionsTL.current = gsap.timeline()
          .set(interactionsRef.current, {
            autoAlpha: 1,
          })
          .fromTo(videoCards, {
            opacity: 0,
            y: 30,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power2.out',
          });
      } else {
        // Just make the container visible without animation if no cards
        gsap.set(interactionsRef.current, {
          autoAlpha: 1,
        });
      }
    }, 50);
  }, { dependencies: [loading, refreshKey] });

  // Setup intersection observer for video playback
  useEffect(() => {
    if (loading) return;

    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        const video = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          // Make sure videos play when they become visible
          if (video.paused) {
            video.play().catch(err => console.log('Video play error:', err));
          }
        } else {
          // Only pause videos when they're not visible to save resources
          video.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    
    // Short timeout to ensure videos are in the DOM
    setTimeout(() => {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => observer.observe(video));
    }, 500);

    return () => {
      observer.disconnect();
    };
  }, [loading, refreshKey]);

  const handleRefreshClick = () => {
    setError(null);
    setForcingRefresh(true);
    
    // Force remount of VideoWrapper component with a new key
    setRefreshKey(prev => prev + 1);
    
    // Show loading indicator for a short time
    setTimeout(() => {
      setForcingRefresh(false);
    }, 1000);
  };

  return (
    <main ref={interactionsRef} className={styles.interactions}>      
            <Suspense fallback={<VideoSkeleton />}>
              <VideoWrapper 
                key={refreshKey} 
                onError={handleError} 
              />
            </Suspense>
    </main>
  );
}
