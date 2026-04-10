'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './BlurEntryAnimation.module.css';

export default function BlurEntryAnimation() {
  const [shouldRender, setShouldRender] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const hasShownRef = useRef(false);

  useEffect(() => {
    // Show blur animation on every full page load (initial or reload),
    // but not on client-side navigations (which don't remount the layout)
    if (typeof window !== 'undefined' && !hasShownRef.current) {
      setShouldRender(true);
      hasShownRef.current = true;
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