import React from 'react';
import styles from './ErrorState.module.css';

interface ErrorStateProps {
  message: string;
}

export default function ErrorState({ message }: ErrorStateProps) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorMessage}>
        <p>Error Loading Videos</p>
        <p>{message || 'Failed to load videos. Try reloading the page.'}</p>
      </div>
    </div>
  );
} 