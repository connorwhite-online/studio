'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './BlurEntryAnimation.module.css';

export default function BlurEntryAnimation() {
  const [shouldRender, setShouldRender] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hasShownRef = useRef(false);

  useEffect(() => {
    // Only show blur animation on true initial page load (not client-side navigation)
    // Check if this is the first render and sessionStorage doesn't have navigation flag
    if (typeof window !== 'undefined' && !hasShownRef.current) {
      const hasNavigated = sessionStorage.getItem('hasNavigated');
      
      if (!hasNavigated) {
        // This is a true initial page load, show the blur animation
        setShouldRender(true);
        hasShownRef.current = true;
        
        // Set flag so subsequent client-side navigations don't trigger it
        sessionStorage.setItem('hasNavigated', 'true');
      }
    }
  }, []);

  useEffect(() => {
    if (!shouldRender) return;
    
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Start the animation immediately
    requestAnimationFrame(() => {
      overlay.classList.add(styles.dissolve);
    });

    // Listen for transition end
    const handleTransitionEnd = () => {
      setShouldRender(false);
    };

    overlay.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      overlay.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <div 
      ref={overlayRef}
      className={styles.blurOverlay}
    />
  );
}