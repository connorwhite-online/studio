import styles from './projects.module.css';
import fetchImages  from '../../lib/fetchImages';
import ProjectGallery from '../../components/ProjectGallery';

const Projects: React.FC = () => {
    return (
        <div>
            <ProjectGallery />
        </div>
    );
};

export default Projects;