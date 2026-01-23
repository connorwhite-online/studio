'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './TabbedCarousel.module.css';
import ProjectCarousel from '../ProjectCarousel';
import InteractionsCarousel from '../InteractionsCarousel';

interface MediaItem {
  id: string;
  videoUrl: string;
  title: string;
}

interface TabbedCarouselProps {
  mediaItems: MediaItem[];
}

export default function TabbedCarousel({ mediaItems }: TabbedCarouselProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'interactions'>('projects');
  const tabsRef = useRef<HTMLDivElement>(null);
  const projectsTabRef = useRef<HTMLButtonElement>(null);
  
  // Restore carousel index from sessionStorage synchronously during initialization
  // This is fast since sessionStorage is in-memory
  const [projectsIndex, setProjectsIndex] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedIndex = sessionStorage.getItem('carouselIndex');
      if (savedIndex !== null) {
        const index = parseInt(savedIndex, 10);
        sessionStorage.removeItem('carouselIndex');
        return index;
      }
    }
    return 0;
  });
  
  const [interactionsIndex, setInteractionsIndex] = useState(0);

  // Update sliding background position when active tab changes
  useEffect(() => {
    if (tabsRef.current) {
      const tabsContainer = tabsRef.current;
      const slidingBackground = tabsContainer.querySelector(`.${styles.slidingBackground}`) as HTMLElement;
      
      if (slidingBackground) {
        if (activeTab === 'projects') {
          slidingBackground.style.transform = 'translateX(0)';
        } else {
          slidingBackground.style.transform = 'translateX(120px)';
        }
      }
    }
  }, [activeTab]);

  return (
    <div className={styles.tabbedCarousel}>
      {/* Tabs */}
      <div className={styles.tabs} ref={tabsRef}>
        <div className={styles.slidingBackground}></div>
        <button
          ref={projectsTabRef}
          className={`${styles.tab} ${activeTab === 'projects' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('projects')}
          aria-label="Projects tab"
        >
          Projects
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'interactions' ? styles.tabActive : ''}`}
          onClick={() => setActiveTab('interactions')}
          aria-label="Interactions tab"
        >
          Interactions
        </button>
      </div>

      {/* Carousel Content */}
      <div className={styles.carouselContainer}>
        <div className={`${styles.carouselWrapper} ${activeTab === 'projects' ? styles.carouselVisible : styles.carouselHidden}`}>
          <ProjectCarousel 
            currentIndex={projectsIndex}
            onIndexChange={setProjectsIndex}
          />
        </div>
        <div className={`${styles.carouselWrapper} ${activeTab === 'interactions' ? styles.carouselVisible : styles.carouselHidden}`}>
          <InteractionsCarousel 
            currentIndex={interactionsIndex}
            onIndexChange={setInteractionsIndex}
            mediaItems={mediaItems}
          />
        </div>
      </div>
    </div>
  );
}
