import React from 'react';
import styles from './MediaSkeleton.module.css';

interface MediaSkeletonProps {
  className?: string;
}

export default function MediaSkeleton({ className }: MediaSkeletonProps) {
  return (
    <div className={`${styles.skeleton} ${className || ''}`}>
      <div className={styles.gradient}></div>
    </div>
  );
}
