'use client';
import styles from './projectcard.module.css';

interface Project {
  id: string;
  name: string;
  role: string[];
  summary: string;
  kpi: string;
  type: string[];
  files: string[];
}
  
  interface ProjectCardProps {
    project: Project;
  }
  
  const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {

    const relativeURL = 'https://bdvkplyefikbvwvrumga.supabase.co/storage/v1/object/public/media/' + project.id + '/';

    return (
      <div className={styles.projectCard}>
        <h1>{project.name}</h1>
        {project.files && project.files.length > 0 ? (
        <div className={styles.mediaGallery}>
          {project.files.map((file, index) => (
            <img key={index} src={relativeURL + file} alt={`${project.name} media ${index + 1}`} height={100} />
          ))}
        </div>
      ) : (
        <p>No media available for this project.</p>
      )}
      </div>
    );
  };
  
  export default ProjectCard;