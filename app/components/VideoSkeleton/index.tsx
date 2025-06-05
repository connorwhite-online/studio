import React from 'react';
import styles from './VideoSkeleton.module.css';

export default function VideoSkeleton() {
  // Create different numbers of skeleton items based on screen size
  // This matches the responsive grid in the CSS
  return (
    <div className={styles.videoGrid}>
      {/* 6 skeletons allows for up to 3 columns on desktop, 2 on tablet, 1 on mobile */}
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className={`${styles.videoCard} ${styles.skeleton}`}>
          <div className={styles.videoSkeleton} />
          <div className={styles.dateSkeleton} />
        </div>
      ))}
    </div>
  );
} 