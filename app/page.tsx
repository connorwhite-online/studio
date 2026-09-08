'use client';
import { useEffect, useState } from 'react';
import styles from "./page.module.css";
import Scene from './components/Scene';
import Bio from './components/Bio';
// Homepage is intentionally minimal for now — keep these unused rather than deleting them.
// import InteractionsSection from './components/InteractionsSection';
// import InfoSection from './components/InfoSection';
// import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    // Check if we're returning from a project page
    const returningFromProject = sessionStorage.getItem('homeScrollPosition');

    if (returningFromProject) {
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
        <div className={styles.bioBlock}>
          <Bio />
        </div>

        {/* Unused for now — sections remain in the codebase.
        <section className={styles.section}>
          <InteractionsSection />
        </section>
        
        <section className={styles.section}>
          <InfoSection />
        </section>
        
        <section className={styles.themeSection}>
          <ThemeToggle />
        </section>
        */}
      </div>
    </main>
  );
}
