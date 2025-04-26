'use client';
import { useState, useEffect } from 'react';
import Satellite from '@/app/icons/Satellite';
import styles from './timestatus.module.css';

interface TimeStatusProps {
  showStatus?: boolean;
  showIcon?: boolean;
  className?: string;
}

export default function TimeStatus({ showStatus = true, showIcon = true, className = '' }: TimeStatusProps) {
  const [time, setTime] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const updateTimeAndStatus = () => {
      // Get Los Angeles time
      const now = new Date();
      const laTime = now.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      
      setTime(laTime);
      
      // Determine status based on time and day
      const hour = now.toLocaleString('en-US', { 
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        hour12: false
      });
      
      const day = now.toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        weekday: 'long'
      });
      
      const hourNum = parseInt(hour, 10);
      const isWeekend = day === 'Saturday' || day === 'Sunday';
      
      if (hourNum >= 21 || hourNum < 8) {
        setStatus('I\'m getting a good nights sleep. Kidding, I\'m looking at vintage japanese 4x4 vehicles on FB Marketplace.');
      } else if (isWeekend && hourNum >= 8 && hourNum < 21) {
        setStatus('I\'m picking weeds in the garden and riding my bike with my son. I\'ll get back to you soon.');
      } else if (hourNum >= 8 && hourNum < 17) {
        setStatus('I\'m locked in, blasting Soulection radio, on my third cup of coffee.');
      } else {
        setStatus('I\'m offline, talk to you soon.');
      }
    };

    updateTimeAndStatus();
    
    // Update time every 5 seconds
    const intervalId = setInterval(updateTimeAndStatus, 5000);
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
        {showStatus && (
          <p className={styles.statusText}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
} 