'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import styles from './TabbedCarousel.module.css';
import CardStack, { CardStackItem } from '../CardStack';
import ProjectImageGallery, { MediaItem as GalleryMediaItem } from '../ProjectImageGallery';
import Loader from '../Loader';
import { projects } from '@/app/data/projects';

interface MediaItem {
  id: string;
  videoUrl: string;
  title: string;
}

interface TabbedCarouselProps {
  mediaItems: MediaItem[];
}

export default function TabbedCarousel({ mediaItems }: TabbedCarouselProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'interactions'>('projects');
  const tabsRef = useRef<HTMLDivElement>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Gallery state for interactions
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [galleryInitialIndex, setGalleryInitialIndex] = useState(0);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Convert projects to CardStackItems
  const projectItems: CardStackItem[] = projects.map((p) => ({
    id: p.id,
    title: p.title,
    coverImage: p.coverImage,
  }));

  // Convert interactions to CardStackItems
  const interactionItems: CardStackItem[] = mediaItems.map((m) => ({
    id: m.id,
    title: m.title,
    videoUrl: m.videoUrl,
  }));

  // Gallery media for interactions
  const galleryMedia: GalleryMediaItem[] = mediaItems.map((m) => ({
    type: 'video' as const,
    src: m.videoUrl,
  }));

  const handleProjectClick = (item: CardStackItem) => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('homeScrollPosition', window.scrollY.toString());
    }
    setIsNavigating(true);
    router.push(`/projects/${item.id}`);
  };

  const handleInteractionClick = (_item: CardStackItem, index: number) => {
    setGalleryInitialIndex(index);
    setIsGalleryOpen(true);
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
  };

  // Update sliding background position
  useEffect(() => {
    if (tabsRef.current) {
      const slidingBackground = tabsRef.current.querySelector(`.${styles.slidingBackground}`) as HTMLElement;
      if (slidingBackground) {
        slidingBackground.style.transform = activeTab === 'projects'
          ? 'translateX(0)'
          : 'translateX(120px)';
      }
    }
  }, [activeTab]);

  return (
    <div className={styles.tabbedCarousel}>
      {/* Loading overlay for project navigation */}
      {isMounted && isNavigating && createPortal(
        <div className={styles.loadingOverlay}>
          <Loader size={50} />
        </div>,
        document.body
      )}

      {/* Tabs */}
      <div className={styles.tabs} ref={tabsRef}>
        <div className={styles.slidingBackground}></div>
        <button
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

      {/* Content */}
      <div className={styles.carouselContainer}>
        <div className={`${styles.carouselWrapper} ${activeTab === 'projects' ? styles.carouselVisible : styles.carouselHidden}`}>
          <CardStack
            items={projectItems}
            onItemClick={handleProjectClick}
          />
        </div>
        <div className={`${styles.carouselWrapper} ${activeTab === 'interactions' ? styles.carouselVisible : styles.carouselHidden}`}>
          <CardStack
            items={interactionItems}
            onItemClick={handleInteractionClick}
          />
        </div>
      </div>

      {/* Gallery overlay for interactions */}
      {isGalleryOpen && (
        <ProjectImageGallery
          media={galleryMedia}
          initialIndex={galleryInitialIndex}
          onClose={handleCloseGallery}
        />
      )}
    </div>
  );
}
