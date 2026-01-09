import React from 'react';
import styles from './ProjectContent.module.css';
// import ProjectImage from '../ProjectImage';
import ProjectVideo from '../ProjectVideo';

export default function Manipulate() {
  return (
    <div className={styles.projectContent}>

      <ProjectVideo
        src="/media/projects/manipulate/manipulatev2.mp4"
        alt="Manipulate demo video"
        projectId="manipulate"
        priority
      />

    </div>
  );
}