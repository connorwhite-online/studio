'use client';
import React, { useState } from 'react';
// import ProjectCard from '../ProjectCard';
import styles from './gallery.module.css';

interface Project {
  id: string;
  name: string;
  role: string[];
  summary: string;
  kpi: string;
  type: string[];
  files: string[];
}

interface ProjectGalleryProps {
  projects: Project[];
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ projects }) => {

  const [ filteredProjects, setFilteredProjects ] = useState<Project[]>(projects);
  const [ currentProject, setCurrentProject ] = useState<number>(1);

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

  return (
    <div className={styles.projectGallery}>
      <div className={styles.galleryFilter}>
        <div className={styles.projectIndex}>{currentProject + '/' + (filteredProjects.length)}</div>
      </div>
      <div className={styles.slideShow}>
        {projects.map((project, index) => {
            const relativeURL = 'https://bdvkplyefikbvwvrumga.supabase.co/storage/v1/object/public/media/' + project.id + '/';
          return isImage(project.files[0]) ? (
            <img key={index} src={relativeURL + project.files[0]} alt={`${project.name} media ${index + 1}`} height={150} />
          ) : isVideo(project.files[0]) ? (
            <video key={index} autoPlay muted loop height={150}>
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
