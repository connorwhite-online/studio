import React from 'react';
import styles from './projectcard.module.css';

interface Project {
  id: string;
  name: string;
  role: string[];
  summary: string;
  kpi: string;
  types: string[];
  files: string[];
}

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const relativeURL = 'https://bdvkplyefikbvwvrumga.supabase.co/storage/v1/object/public/media/' + project.id + '/';
  
  const isImage = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'bmp'].includes(ext ?? '');
  };

  const isVideo = (file: string) => {
    const ext = file.split('.').pop()?.toLowerCase();
    return ['mp4', 'webm', 'ogg'].includes(ext ?? '');
  };

  return (
    <main className={styles.projectCard}>
      <section className={styles.imageContainer}>
        {isImage(project.files[0]) ? (
          <img className={styles.media} src={relativeURL + project.files[0]} alt={`${project.name} image`}  />
        ) : isVideo(project.files[0]) ? (
          <video key={relativeURL + project.files[0]} className={styles.media} autoPlay muted loop playsInline >
            <source src={relativeURL + project.files[0]} type="video/mp4" />
          </video>
        ) : null}
      </section>
      <section className={styles.textContainer}>
        <h1>{project.name}</h1>
        <ul className={styles.rolesList}>
          {project.role.map((role, index) => (
            <li key={index} className={styles.role}>{role}</li>
          ))}
        </ul>
        <p>{project.summary}</p>
        <p>{project.kpi}</p>
      </section>
    </main>
  );
};

export default ProjectCard;
