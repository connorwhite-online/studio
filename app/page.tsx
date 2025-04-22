'use client';
import styles from "./page.module.css";
import { useState, useEffect } from 'react';
import Satellite from './icons/Satellite';

export default function Home() {
  const [time, setTime] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get Los Angeles time
    const updateTime = () => {
      const laTime = new Date().toLocaleString('en-US', {
        timeZone: 'America/Los_Angeles',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
      });
      setTime(laTime);
    };

    updateTime();
    
    // Update time every minute
    const intervalId = setInterval(updateTime, 30000);
    setLoading(false);
    
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>Connor is a software designer and engineer, interested mostly in interaction design, both experimental and practical.</h2>
        
        <div className={styles.timeContainer}>
          <Satellite className={styles.satellite} size={20} />
          <p className={styles.timeText}>
            Based in Los Angeles ({time})
          </p>
        </div>
      </div>
    </main>
  );
}
