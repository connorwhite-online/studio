'use client';
import { useEffect, useState } from 'react';
import styles from "./page.module.css";
import Scene from './components/Scene';
import InteractionsSection from './components/InteractionsSection';
import InfoSection from './components/InfoSection';
import Bio from './components/Bio';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Restore scroll position if returning from a project page
    const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedScrollPosition) {
      window.scrollTo(0, parseInt(savedScrollPosition, 10));
      sessionStorage.removeItem('homeScrollPosition');
      // Trigger animation when returning
      setShouldAnimate(true);
    }
  }, []);

  return (
    <main className={`${styles.main} ${shouldAnimate ? styles.fadeIn : ''}`}>
      <div className={styles.container}>
        {/* Scene Section */}
        <section className={styles.sceneSection}>
          <Scene />
        </section>
        
        {/* Bio Section */}
        <Bio />
        
        {/* Interactions Section */}
        <section className={styles.section}>
          <InteractionsSection />
        </section>
        
        {/* Info Section */}
        <section className={styles.section}>
          <InfoSection />
        </section>
        
        {/* Theme Toggle Section */}
        <section className={styles.themeSection}>
          <ThemeToggle />
        </section>
      </div>
    </main>
  );
}
