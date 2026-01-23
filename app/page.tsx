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
    // Check if we're returning from a project page
    const returningFromProject = sessionStorage.getItem('homeScrollPosition');
    
    if (returningFromProject) {
      // Trigger fade-in animation when returning from project
      setShouldAnimate(true);
      
      // Restore scroll position instantly
      const savedPosition = parseInt(returningFromProject, 10);
      window.scrollTo(0, savedPosition);
      
      // Clean up
      sessionStorage.removeItem('homeScrollPosition');
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
