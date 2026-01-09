import React from 'react';
import styles from './ProjectContent.module.css';
import ProjectImage from '../ProjectImage';
import ProjectVideo from '../ProjectVideo';

export default function TybForms() {
  return (
    <div className={styles.projectContent}>

      <ProjectImage
        src="/media/projects/tyb-forms/tyb-forms-challenge.png"
        alt="TYB Integrations Overview"
        projectId="tyb-forms"
        priority
      />

      <ProjectImage
        src="/media/projects/tyb-forms/tyb-forms-02.png"
        alt="Platform Connections"
        projectId="tyb-forms"
      />

<div className={styles.section}>

      <ProjectImage
        src="/media/projects/tyb-forms/tyb-forms-04.png"
        alt="Platform Connections"
        projectId="tyb-forms"
      />
      <p>The form design translated well to forms lacking a visual output, by containing information to a digestible width, and organizing related fields.</p>
      </div>

      <div className={styles.section}>
      <ProjectImage
        src="/media/projects/tyb-forms/tyb-forms-previous.png"
        alt="Platform Connections"
        projectId="tyb-forms"
      />
      <p>The existing forms on TYB were essentially lists, without any real structure, hierarchy, or preview of what the form was outputting.</p>
      </div>

      <div className={styles.section}>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
        <h3>Polish</h3>
        </div>
        <ProjectVideo
          src="/media/projects/tyb-forms/tyb-forms-interaction.mp4"
          alt="TYB form section interaction"
          projectId="tyb-forms"
        />
        <p>Opening a section collapses all other sections with a subtle spring rotation on the chevrons, and a soft open and close. This pattern allows users to navigate the form without the cognitive load of viewing all content at once.</p>
      </div>

    </div>
  );
}