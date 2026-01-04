import React from 'react';
import styles from './ProjectContent.module.css';
import ProjectImage from '../ProjectImage';

export default function TybIntegrations() {
  return (
    <div className={styles.projectContent}>

      <ProjectImage
        src="/media/projects/tyb-integrations/tyb-integrations-01.png"
        alt="TYB Integrations Overview"
        projectId="tyb-integrations"
        priority
      />

      <ProjectImage
        src="/media/projects/tyb-integrations/tyb-integrations-02.png"
        alt="Platform Connections"
        projectId="tyb-integrations"
      />

      <ProjectImage
        src="/media/projects/tyb-integrations/tyb-integrations-03.png"
        alt="Platform Connections"
        projectId="tyb-integrations"
      />

      <ProjectImage
        src="/media/projects/tyb-integrations/tyb-integrations-04.png"
        alt="Platform Connections"
        projectId="tyb-integrations"
      />

      <ProjectImage
        src="/media/projects/tyb-integrations/tyb-integrations-05.png"
        alt="Platform Connections"
        projectId="tyb-integrations"
      />
    </div>
  );
}
