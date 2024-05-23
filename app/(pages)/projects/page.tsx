import ProjectGalleryServer from '../../server/ProjectGalleryServer';
import styles from './projects.module.css';

const Projects: React.FC = () => {
    return (
        <div className={styles.projects}>
            <ProjectGalleryServer />
        </div>
    );
};

export default Projects;