import React from 'react';
import styles from './ProjectContent.module.css';
import ProjectImage from '../ProjectImage';
import ProjectVideo from '../ProjectVideo';

export default function Blackbird() {
  return (
    <div className={styles.projectContent}>

      <ProjectImage
        src="/media/projects/blackbird/blackbird-01.png"
        alt="Blackbird single token static screen"
        projectId="blackbird"
        priority
      />

      <ProjectVideo
        src="/media/projects/blackbird/blackbird-screen-capture.mov"
        alt="Blackbird mobile screen capture"
        projectId="blackbird"
      />

      <ProjectImage
        src="/media/projects/blackbird/blackbird-02.png"
        alt="Blackbird multiple tokens static screen"
        projectId="blackbird"
      />

      <ProjectImage
        src="/media/projects/blackbird/blackbird-blender-file.PNG"
        alt="Screenshot of Blender file working on tokens"
        projectId="blackbird"
      />

    </div>
  );
}