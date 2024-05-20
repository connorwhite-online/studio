import styles from './projects.module.css';
import fetchImages  from '../../lib/fetchImages'
import Gallery from '../../components/gallery';

interface ProjectsProps {
    images: string[];
}

export async function getStaticProps() {
  const { images } = await fetchImages();
  return {
    props: {
      images,
    },
  };
}

const Projects: React.FC<ProjectsProps> = ({ images }) => {
    return (
        <div>
            <Gallery images={images} />
        </div>
    );
};

export default Projects;