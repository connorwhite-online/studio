'use client';
import ProjectCard from '../ProjectCard';

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
console.log('projects:', projects);
  return (
    <div className="project-gallery">
      <div className="gallery">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
