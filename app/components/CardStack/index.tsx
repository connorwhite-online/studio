'use client';

import React, { useState, useEffect, useLayoutEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import styles from './CardStack.module.css';
import Close from '@/app/icons/Close';
import MediaSkeleton from '../MediaSkeleton';

export interface CardStackItem {
  id: string;
  title: string;
  coverImage?: string;
  videoUrl?: string;
}

interface CardStackProps {
  items: CardStackItem[];
  onItemClick: (item: CardStackItem, index: number) => void;
}

const STACK_ROTATIONS: Record<number, number> = { 0: -6, 2: 6 };
const STACK_Z: Record<number, number> = { 0: 12, 1: 11, 2: 10 };
// Non-hover CSS transforms — used to measure resting positions regardless of hover state
const STACK_TRANSFORMS: Record<number, string> = {
  0: 'rotate(-6deg) translateX(-15%) translateY(4px)',
  1: 'rotate(0deg) translateY(0)',
  2: 'rotate(6deg) translateX(15%) translateY(4px)',
};

export default function CardStack({ items, onItemClick }: CardStackProps) {
  const [expanded, setExpanded] = useState(false);
  const [stackRects, setStackRects] = useState<DOMRect[]>([]);
  const [titlesVisible, setTitlesVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const [loadedMedia, setLoadedMedia] = useState<Set<number>>(new Set());
  const [isMounted, setIsMounted] = useState(false);
  const [hoverLocked, setHoverLocked] = useState(false);

  const stackCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => { setIsMounted(true); }, []);

  const markLoaded = useCallback((index: number) => {
    setLoadedMedia(prev => {
      if (prev.has(index)) return prev;
      return new Set(prev).add(index);
    });
  }, []);

  // ── Expand ──

  const handleExpand = useCallback(() => {
    if (expanded) return;

    // Force cards to their resting (non-hover) transforms before measuring
    stackCardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.transition = 'none';
      el.style.transform = STACK_TRANSFORMS[i] ?? 'rotate(0deg) translateY(0)';
    });
    // Force reflow so the browser applies the resting transforms
    stackCardRefs.current[0]?.offsetHeight;

    // Measure resting positions using offsetWidth/Height (unaffected by rotation)
    const rects = stackCardRefs.current.map(el => {
      if (!el) return new DOMRect();
      const bbox = el.getBoundingClientRect();
      const cx = bbox.left + bbox.width / 2;
      const cy = bbox.top + bbox.height / 2;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      return new DOMRect(cx - w / 2, cy - h / 2, w, h);
    });

    // Clear inline overrides — CSS (hover or not) takes back over,
    // but the stack is about to go opacity:0 so it doesn't matter
    stackCardRefs.current.forEach(el => {
      if (!el) return;
      el.style.transition = '';
      el.style.transform = '';
    });

    setStackRects(rects);
    setTitlesVisible(false);
    setExpanded(true);
  }, [expanded]);

  // FLIP open: grid cards start at stack positions, animate to grid
  useLayoutEffect(() => {
    if (!expanded || stackRects.length === 0 || isClosing || !gridRef.current) return;

    if (gridRef.current.parentElement) {
      gridRef.current.parentElement.scrollTop = 0;
    }

    const cards = gridRef.current.querySelectorAll<HTMLElement>(`.${styles.gridCard}`);
    if (!cards.length) return;

    cards.forEach((el, i) => {
      const gridRect = el.getBoundingClientRect();
      const stackRect = stackRects[i] || stackRects[1];

      const dx = (stackRect.left + stackRect.width / 2) - (gridRect.left + gridRect.width / 2);
      const dy = (stackRect.top + stackRect.height / 2) - (gridRect.top + gridRect.height / 2);
      const s = stackRect.width / gridRect.width; // uniform scale
      const rot = STACK_ROTATIONS[i] ?? 0;

      // Counteract scale on border-radius at start position
      const img = el.querySelector(`.${styles.gridCardImage}`) as HTMLElement | null;
      if (img) img.style.borderRadius = `${24 / s}px`;

      el.style.transition = 'none';
      el.style.transform = `translate(${dx}px, ${dy}px) scale(${s}) rotate(${rot}deg)`;
      if (i > 2) el.style.opacity = '0';
      if (i in STACK_Z) el.style.zIndex = String(STACK_Z[i]);

      el.getBoundingClientRect();

      const delay = i * 25;
      el.style.transition = `transform 0.55s cubic-bezier(0.25, 1.2, 0.5, 1) ${delay}ms, opacity 0.35s ease-out ${delay}ms`;
      el.style.transform = 'none';
      if (img) img.style.borderRadius = '';
      if (i > 2) el.style.opacity = '1';
    });

    const titleTimeout = setTimeout(() => setTitlesVisible(true), 400 + items.length * 15);
    const cleanupTimeout = setTimeout(() => {
      cards.forEach(el => {
        el.style.transition = '';
        el.style.transform = '';
        el.style.zIndex = '';
        el.style.opacity = '';
      });
    }, 650 + items.length * 25);

    return () => { clearTimeout(titleTimeout); clearTimeout(cleanupTimeout); };
  }, [expanded, stackRects, isClosing, items.length]);

  // ── Close ──

  const handleClose = useCallback(() => {
    if (isClosing || !gridRef.current) return;

    setTitlesVisible(false);
    setIsClosing(true);

    setTimeout(() => {
      if (!gridRef.current) return;

      // Collapse titles so they don't inflate the card measurements
      const titles = gridRef.current.querySelectorAll<HTMLElement>(`.${styles.gridCardTitle}`);
      titles.forEach(t => { t.style.display = 'none'; });

      const cards = gridRef.current.querySelectorAll<HTMLElement>(`.${styles.gridCard}`);

      cards.forEach((el, i) => {
        const currentRect = el.getBoundingClientRect();
        const targetRect = stackRects[i] || stackRects[1];

        const dx = (targetRect.left + targetRect.width / 2) - (currentRect.left + currentRect.width / 2);
        const dy = (targetRect.top + targetRect.height / 2) - (currentRect.top + currentRect.height / 2);
        const s = targetRect.width / currentRect.width; // uniform scale
        const rot = STACK_ROTATIONS[i] ?? 0;

        if (i in STACK_Z) el.style.zIndex = String(STACK_Z[i]);

        // Counteract scale on border-radius so it stays visually 24px
        const img = el.querySelector(`.${styles.gridCardImage}`) as HTMLElement | null;
        if (img) img.style.borderRadius = `${24 / s}px`;

        const delay = i * 10;
        el.style.transition = `transform 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms, opacity 0.2s ease-in ${delay}ms`;
        el.style.transform = `translate(${dx}px, ${dy}px) scale(${s}) rotate(${rot}deg)`;
        if (i > 2) el.style.opacity = '0';
      });

      const totalDuration = 300 + (items.length - 1) * 10 + 50;
      setTimeout(() => {
        setHoverLocked(true);
        setExpanded(false);
        setIsClosing(false);
        setClickedIndex(null);
        setStackRects([]);
        // Re-enable hover after cursor has likely moved or settled
        setTimeout(() => setHoverLocked(false), 300);
      }, totalDuration);
    }, 80);
  }, [stackRects, isClosing, items.length]);

  // Escape key + lock scroll
  useEffect(() => {
    if (!expanded) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
    };
  }, [expanded, handleClose]);

  // ── Card interactions ──

  const handleCardClick = (e: React.MouseEvent, item: CardStackItem, index: number) => {
    e.stopPropagation();
    setClickedIndex(index);
    setTimeout(() => onItemClick(item, index), 200);
  };

  const handleVideoHover = (index: number, playing: boolean) => {
    const video = videoRefs.current[index];
    if (!video) return;
    if (playing) video.play().catch(() => {});
    else { video.pause(); video.currentTime = 0; }
  };

  // ── Media rendering ──

  const renderMedia = (item: CardStackItem, index: number) => {
    const loaded = loadedMedia.has(index);
    if (item.coverImage) {
      return (
        <>
          {!loaded && <div className={styles.skeletonWrapper}><MediaSkeleton className={styles.fullSizeSkeleton} /></div>}
          <Image
            src={item.coverImage} alt={item.title} fill sizes="(max-width: 768px) 50vw, 33vw"
            className={styles.media}
            onLoad={() => markLoaded(index)}
            onError={() => markLoaded(index)}
            style={{ opacity: loaded ? 1 : 0 }}
          />
        </>
      );
    }
    if (item.videoUrl) {
      return (
        <>
          {!loaded && <div className={styles.skeletonWrapper}><MediaSkeleton className={styles.fullSizeSkeleton} /></div>}
          <video
            ref={el => {
              videoRefs.current[index] = el;
              if (el && el.readyState >= 1 && !loadedMedia.has(index)) markLoaded(index);
            }}
            src={item.videoUrl} className={styles.media}
            muted playsInline loop autoPlay preload="auto"
            onLoadedMetadata={() => markLoaded(index)}
            onLoadedData={() => markLoaded(index)}
            onError={() => markLoaded(index)}
            style={{ opacity: loaded ? 1 : 0 }}
          />
        </>
      );
    }
    return null;
  };

  const getStackClass = (index: number) => {
    if (index === 0) return styles.stackLeft;
    if (index === 1) return styles.stackCenter;
    if (index === 2) return styles.stackRight;
    return styles.stackHidden;
  };

  // ── Portal overlay ──

  const overlay = expanded && isMounted ? createPortal(
    <div className={styles.overlay}>
      {/* Background */}
      <div className={`${styles.overlayBg} ${!isClosing ? styles.overlayBgVisible : ''}`} />

      {/* Scrollable grid */}
      <div className={styles.overlayScroll}>
        <div className={styles.grid} ref={gridRef}>
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`${styles.gridCard} ${clickedIndex === index ? styles.gridCardClicked : ''}`}
              onClick={(e) => handleCardClick(e, item, index)}
              onMouseEnter={item.videoUrl ? () => handleVideoHover(index, true) : undefined}
              onMouseLeave={item.videoUrl ? () => handleVideoHover(index, false) : undefined}
            >
              <div className={styles.gridCardImage}>
                {renderMedia(item, index)}
              </div>
              <p className={`${styles.gridCardTitle} ${titlesVisible ? styles.gridCardTitleVisible : ''}`}>
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Close button */}
      <button
        className={`${styles.closeButton} ${isClosing ? styles.closeButtonHiding : ''}`}
        onClick={handleClose}
        aria-label="Close"
      >
        <Close size={18} /><p>Close</p>
      </button>
    </div>,
    document.body
  ) : null;

  // ── Stack (always in page flow) ──

  return (
    <>
      <div
        className={styles.stack}
        onClick={handleExpand}
        style={{ opacity: expanded ? 0 : 1, pointerEvents: hoverLocked ? 'none' : undefined }}
      >
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={el => { stackCardRefs.current[index] = el; }}
            className={`${styles.stackCard} ${getStackClass(index)}`}
          >
            <div className={styles.stackCardImage}>
              {renderMedia(item, index)}
            </div>
          </div>
        ))}
      </div>
      {overlay}
    </>
  );
}
