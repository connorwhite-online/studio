'use client';
import React, { useState, useEffect } from 'react';
// import ProjectCard from '../ProjectCard';
import styles from './gallery.module.css';

interface Project {
  id: string;
  name: string;
  role: string[];
  summary: string;
  kpi: string;
  types: string[];
  files: string[];
}

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {

  const [ filteredProjects, setFilteredProjects ] = useState<Project[]>(projects);
  const [ currentProject, setCurrentProject ] = useState<Project>(filteredProjects[0]);
  const [ selectedTypes, setSelectedTypes ] = useState<string[]>([]);

  // Helper function to check if the file is an image
  const isImage = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext ?? '');
  };

  // Helper function to check if the file is a video
  const isVideo = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase();
    return ['mp4', 'webm', 'ogg'].includes(ext ?? '');
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
    });
    setFilteredProjects(filtered);
    setCurrentProject(filtered[0]); // Reset current project to the first one
  }, [filteredProjects, selectedTypes]);

  // Clear tags function
  const clearTypes = () => {
    setSelectedTypes([]);
  };

  const formatIndex = (index: number) => {
    return String(index + 1).padStart(2, '0'); // Adjusted to start from 1
  };

  return (
    <div className={styles.projectGallery}>
      <div className={styles.galleryFilter}>
        <div className={styles.projectIndex}>{formatIndex(filteredProjects.length) + '/' + formatIndex(filteredProjects.length)}</div>
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
          return isImage(project.files[0]) ? (
            <img className={styles.media} key={project.name} src={relativeURL + project.files[0]} alt={`${project.name} media ${index + 1}`} height={150} draggable='false' />
          ) : isVideo(project.files[0]) ? (
            <video className={styles.media} key={project.name} autoPlay muted loop controlsList="nofullscreen" height={150}>
              <source src={relativeURL + project.files[0]} type="video/mp4" />
            </video>
          ) : null;
        })}
      </div>
      {/* <div className="gallery">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div> */}
    </div>
  );
};

export default ProjectGallery;
