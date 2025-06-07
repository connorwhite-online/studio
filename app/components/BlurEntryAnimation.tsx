'use client';

import { useState, useEffect } from 'react';
import styles from './BlurEntryAnimation.module.css';

export default function BlurEntryAnimation() {
  const [isAnimating, setIsAnimating] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Start the animation after component mounts
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 100); // Small delay to ensure component is rendered

    // Remove from DOM after animation completes
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 1600); // 1.5s animation + 0.1s delay

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <div 
      className={`${styles.blurOverlay} ${!isAnimating ? styles.dissolve : ''}`}
    />
  );
} 