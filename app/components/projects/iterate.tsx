import React from 'react';
import styles from './ProjectContent.module.css';
import ProjectVideo from '../ProjectVideo';

export default function Iterate() {
  return (
    <div className={styles.projectContent}>

      <ProjectVideo
        src="/media/projects/iterate/iterate-v1.mp4"
        alt="Iterate demo video"
        projectId="iterate"
        priority
      />

    </div>
  );
}