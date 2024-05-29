'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './gallerypopup.module.css';

interface GalleryPopupProps {
  files: string[];
  onClose: () => void;
}

const GalleryPopup: React.FC<GalleryPopupProps> = ({ files, onClose }) => {
  const relativeURL = 'https://bdvkplyefikbvwvrumga.supabase.co/storage/v1/object/public/media/';

  const isImage = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext ?? '');
  };

  const isVideo = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase();
    return ['mp4', 'mov', 'ogg'].includes(ext ?? '');
  };

  const popupRef = useRef<HTMLDivElement>(null);
  const introTL = useRef<gsap.core.Timeline>();

  useGSAP(() => {
    introTL.current = gsap.timeline({})
    .to(popupRef.current, {
        clipPath: 'inset(0%)',
        autoAlpha: 1,
        duration: 1,
        ease: 'power4.out'
    })
    .from(`.${styles.media}`, {
        duration: 2,
        ease: 'power4.out',
        clipPath: 'inset(100% 0)',
        scale: .75,
        stagger: 0.2
    })
    .from(`.${styles.closeButton}`, {
        duration: 1,
        autoAlpha: 0,
        ease: 'power4.out',
    }, "<25%")
  }, {scope: popupRef});

  return (
    <div className={styles.galleryPopup} ref={popupRef}>
      <button className={styles.closeButton} onClick={onClose}>Close</button>
      <div className={styles.galleryContent}>
        {files.map((file, index) => (
          <div key={index} className={styles.mediaContainer}>
            {isImage(file) ? (
              <img className={styles.media} src={relativeURL + file} alt={`Gallery item ${index + 1}`} />
            ) : isVideo(file) ? (
              <video className={styles.media} autoPlay muted loop playsInline>
                <source src={relativeURL + file} type="video/mp4" />
              </video>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPopup;
