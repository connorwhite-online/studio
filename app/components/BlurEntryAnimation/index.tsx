'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './BlurEntryAnimation.module.css';

export default function BlurEntryAnimation() {
  const [shouldRender, setShouldRender] = useState(true);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      ref={overlayRef}
      className={styles.blurOverlay}
    />
  );
}