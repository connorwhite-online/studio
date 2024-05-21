interface Project {
    id: string;
    name: string;
  }
  
  interface ProjectCardProps {
    project: Project;
  }
  
  const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    return (
      <div className="project-card">
        <h1>{project.name}</h1>
      </div>
    );
  };
  
  export default ProjectCard;