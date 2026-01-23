import React from 'react';
import Loader from '@/app/components/Loader';
import styles from './loading.module.css';

export default function Loading() {
  return (
    <div className={styles.loadingContainer}>
      <Loader size={50} />
    </div>
  );
}
