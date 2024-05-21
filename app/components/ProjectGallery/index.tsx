'use client';

import { useState, useEffect } from 'react';
import supabase from '../../lib/supabaseClient';
import ProjectCard from '../ProjectCard';

interface Project {
  id: string;
  name: string;
}

const ProjectGallery: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      let { data: projects, error } = await supabase
        .from('projects')
        .select('id, name');

      if (error) {
        console.error('Error fetching projects:', error);
      } else {
        setProjects(projects ?? []);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="project-gallery">
      <div className="gallery">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
