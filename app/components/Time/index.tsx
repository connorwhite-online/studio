'use client';
import { useState, useEffect } from 'react';
import Satellite from '@/app/icons/Satellite';
import styles from './time.module.css';

interface TimeProps {
  showIcon?: boolean;
  className?: string;
}

export default function Time({ showIcon = true, className = '' }: TimeProps) {
  const [time, setTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateTime = () => {
      // Get Los Angeles time
      const now = new Date();
      const laTime = now.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      
      setTime(laTime);
    };

    updateTime();
    
    // Update time every 5 seconds
    const intervalId = setInterval(updateTime, 5000);
    setLoading(false);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={`${styles.timeContainer} ${className}`}>
      {showIcon && <Satellite className={styles.satellite} size={20} />}
      <div className={styles.textContainer}>
        <p className={styles.timeText}>
          Los Angeles ({time})
        </p>
      </div>
    </div>
  );
} 