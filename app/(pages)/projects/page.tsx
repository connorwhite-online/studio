import styles from './projects.module.css';
// import fetchImages  from '../../lib/fetchImages';
import ProjectGallery from '../../components/ProjectGallery';

const Projects: React.FC = () => {
    return (
        <div>
            <ProjectGallery />
            <h1>Projects</h1>
            <p>Here are some of my past projects.</p>
        </div>
    );
};

export default Projects;