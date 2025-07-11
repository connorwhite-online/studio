'use client';
import styles from "./page.module.css";
import Scene from './components/Scene';
import InteractionsSection from './components/InteractionsSection';
import InfoSection from './components/InfoSection';
import Bio from './components/Bio';
import ThemeToggle from './components/ThemeToggle';

export default function Home() {
  return (
    <main className={styles.main}>
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
