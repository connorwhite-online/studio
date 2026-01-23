import React from 'react';
import styles from './Loader.module.css';

interface LoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

export default function Loader({ size = 40, color, className }: LoaderProps) {
  return (
    <div className={`${styles.loaderContainer} ${className || ''}`}>
      <svg
        className={styles.spinner}
        width={size}
        height={size}
        viewBox="0 0 50 50"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className={styles.path}
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
          stroke={color || 'var(--primary)'}
          strokeLinecap="round"
          strokeDasharray="94.25"
          strokeDashoffset="23.56"
        />
      </svg>
    </div>
  );
}
