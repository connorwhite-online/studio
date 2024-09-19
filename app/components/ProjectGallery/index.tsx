'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import ProjectCard from '../ProjectCard';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './gallery.module.css';

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

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {

  const projectRef = useRef<HTMLDivElement>(null);
  const introTL = useRef<gsap.core.Timeline>();

  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  const [currentProject, setCurrentProject] = useState<Project>(filteredProjects[0]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Helper function to check if the file is an image
  const isImage = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext ?? '');
  };

  // Helper function to check if the file is a video
  const isVideo = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase();
    return ['mp4', 'webm', 'mov'].includes(ext ?? '');
  };

  // Get all unique types from the projects
  const allTypes = projects.reduce<string[]>((types, project) => {
    project.types.forEach((type) => {
      if (!types.includes(type)) {
        types.push(type);
      }
    });
    return types;
  }, []);

  const handleTypeSelection = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(prev => prev.filter(t => t !== type));
    } else {
      setSelectedTypes(prev => [...prev, type]);
    }
  };

  // Update filteredProjects whenever projects or selectedTypes change
  useEffect(() => {
    const filtered = projects.filter(project => {
      if (selectedTypes.length === 0) return true;
      return selectedTypes.some(type => project.types.includes(type));
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    setFilteredProjects(filtered);
    setCurrentProject(filtered[0] || null); // Reset current project to the first one
  }, [projects, selectedTypes]);

  // Clear tags function
  const clearTypes = () => {
    setSelectedTypes([]);
  };

  const formatIndex = (index: number) => {
    return String(index).padStart(2, '0'); // Adjusted to start from 1
  };

  const handleProjectClick = (project: Project) => {
    setCurrentProject(project);
  };

  const currentProjectIndex = filteredProjects.findIndex(project => project.id === currentProject.id);

  // Slideshow Intro Animation
  useGSAP(() => {

    if (!projects) return null;

    introTL.current = gsap.timeline({})
    .set(projectRef.current, {
      autoAlpha: 1
    })
    .from(`.${styles.media}`, {
      duration: 1.5,
      transform: 'translateX(500px)',
      opacity: 0,
      ease: 'power4.out',
      stagger: 0.1
    })
    .from(`.${styles.projectIndex}`, {
      autoAlpha: 0,
      duration: 1,
    }, "<25%")
    .from(`.${styles.typeFilter}`, {
      // y: 50,
      autoAlpha: 0,
      transform: 'translateY(25px)',
      ease: 'power4.out',
      duration: 1,
      stagger: 0.1
    }, "<25%")
  }, {dependencies: [], scope: projectRef})


  return (
    <div className={styles.projectGallery} ref={projectRef}>
      <div className={styles.galleryFilter}>
        <div className={styles.projectIndex}>{formatIndex(currentProjectIndex + 1) + '/' + formatIndex(filteredProjects.length)}</div>
        <div className={styles.filters}>
        <div className={`${styles.typeFilter} ${selectedTypes.length === 0 ? styles.selected : ''}`} onClick={() => clearTypes()}>All</div>
          {allTypes.map((type, index) => (
            <div key={index} className={`${styles.typeFilter} ${selectedTypes.includes(type) ? styles.selected : ''}`} onClick={() => handleTypeSelection(type)}>{type}</div>
          ))}
        </div>
      </div>
      <div className={styles.slideShow}>
        {filteredProjects.map((project, index) => {
          const relativeURL = 'https://bdvkplyefikbvwvrumga.supabase.co/storage/v1/object/public/media/' + project.id + '/';
          return (
            <div key={project.name} onClick={() => handleProjectClick(project)} className={`${project.id === currentProject.id ? styles.currentProject : styles.projectItem}`}>
              {isImage(project.files[0]) ? (
                <Image className={styles.media} src={relativeURL + project.files[0]} alt={`${project.name} media ${index + 1}`} height={150} width={150} draggable='false' placeholder='blur' blurDataURL='blur.png' />
              ) : isVideo(project.files[0]) ? (
                <video className={styles.media} autoPlay muted loop playsInline height={150}>
                  <source src={relativeURL + project.files[0]} type="video/mp4" />
                </video>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className={styles.projectDetails}>
        <ProjectCard project={currentProject} />
      </div>
    </div>
  );
};

export default ProjectGallery;
