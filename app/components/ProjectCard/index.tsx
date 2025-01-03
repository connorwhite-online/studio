import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './projectcard.module.css';
import GalleryPopup from '../GalleryPopup';
import ImageIcon from '@/app/icons/Image';
import LinkIcon from '@/app/icons/Link';

interface Project {
  id: string;
  name: string;
  role: string[];
  summary: string;
  kpi: string;
  types: string[];
  files: string[];
  date: string;
  link: string;
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {

  

  const cardRef = useRef<HTMLDivElement>(null);
  const introTL = useRef<gsap.core.Timeline>();
  const [showGallery, setShowGallery] = useState(false); // State for gallery visibility


  useGSAP(() => {

    if (!project) return null;
    
    if (introTL.current) {
      introTL.current.kill();
    }
    
    introTL.current = gsap.timeline({})
      .set(cardRef.current, {
        autoAlpha: 1
      })
      .from(`.${styles.media}`, {
        duration: 2,
        ease: 'power4.out',
        clipPath: 'inset(100% 0)',
        scale: .75,
        stagger: 0.2
      })
      .from(`.${styles.projectTitle}`, {
        autoAlpha: 0,
        clipPath: 'inset(0 0 100% 0)',
        transform: 'translateY(25px)',
        duration: 1,
        ease: 'power4.out',
      }, "<25%")
      .from(`.${styles.button}`, {
        autoAlpha: 0,
        scale: 0.9,
        duration: 1,
        ease: 'power4.out',
        stagger: 0.15
      }, "<25%")
      .fromTo("p", {
        autoAlpha: 0,
      }, {
        autoAlpha: 1,
        ease: 'power2.out',
        duration: 2,
        stagger: 0.2
      }, "<25%");

    introTL.current.play();
  }, [project]);

  const relativeURL = 'https://bdvkplyefikbvwvrumga.supabase.co/storage/v1/object/public/media/' + project.id + '/';
  
  const isImage = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext ?? '');
  };

  const isVideo = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase();
    return ['mp4', 'webm', 'mov'].includes(ext ?? '');
  };

  return (
    <main className={styles.projectCard} ref={cardRef}>
      <section className={styles.imageContainer}>
        {isImage(project.files[0]) ? (
          <Image priority className={styles.media} key={project.id + project.files[0]} src={relativeURL + project.files[0]} alt={`${project.name} image`} fill={true} draggable='false' placeholder='blur' blurDataURL='blur.png' />
        ) : isVideo(project.files[0]) ? (
          <video key={project.id + project.files[0]} className={styles.media} autoPlay muted loop playsInline >
            <source src={relativeURL + project.files[0]} type="video/mp4" />
          </video>
        ) : null}
      </section>
      <section className={styles.textContainer}>
        <h1 className={styles.projectTitle}>{project.name}</h1>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => setShowGallery(true)}>
            <ImageIcon size={16} />
            Gallery
          </button>
          <Link href={project.link} target="_blank" className={styles.button}>
            <LinkIcon size={16} />
            View Project
          </Link>
        </div>
        <p>{project.summary}</p>
        <p>{project.kpi}</p>
      </section>
      {showGallery && <GalleryPopup files={project.files.map(file => project.id + '/' + file)} onClose={() => setShowGallery(false)} />}
    </main>
  );
};

export default ProjectCard;
