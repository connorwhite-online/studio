'use client';
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
    <div className={styles.projectCard}>
      {/* <h1>{project.name}</h1> */}
      {project.files && project.files.length > 0 ? (
        <div className={styles.mediaGallery}>
          {project.files.map((file, index) => {
            const fileUrl = relativeURL + file;
            return isImage(file) ? (
              <img key={index} src={fileUrl} alt={`${project.name} media ${index + 1}`} height={100} />
            ) : isVideo(file) ? (
              <video key={index} src={fileUrl} autoPlay muted loop height={100} />
            ) : null;
          })}
        </div>
      ) : (
        <p>No media available for this project.</p>
      )}
    </div>
  );
};

export default ProjectCard;