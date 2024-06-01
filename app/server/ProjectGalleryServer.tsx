import supabase from '../lib/supabaseClient';
import ProjectGallery from '../components/ProjectGallery';

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

const fetchProjects = async (): Promise<Project[]> => {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('date, id, name, role, summary, kpi, types, files, link');

  if (error) {
    console.error('Error fetching projects:', error);
    return [];
  }

  return projects;
};

const ProjectGalleryServer: React.FC = async () => {
  const projects = await fetchProjects();
  return <ProjectGallery projects={projects} />;
};

export default ProjectGalleryServer;
