import React from 'react';
import styles from './ProjectContent.module.css';
import ProjectImage from '../ProjectImage';

export default function TybOnboarding() {
  return (
    <div className={styles.projectContent}>

      {/* Auto-loads all images from tyb-onboarding folder */}
      <ProjectImage
        src="/media/projects/tyb-onboarding/tyb-onboarding-01.png"
        alt="TYB Onboarding Flow"
        projectId="tyb-onboarding"
        priority
      />

      <ProjectImage
        src="/media/projects/tyb-onboarding/tyb-onboarding-02.png"
        alt="TYB Onboarding Flow"
        projectId="tyb-onboarding"
      />

      <ProjectImage
        src="/media/projects/tyb-onboarding/tyb-onboarding-03.png"
        alt="TYB Onboarding Flow"
        projectId="tyb-onboarding"
      />

      <ProjectImage
        src="/media/projects/tyb-onboarding/tyb-onboarding-04.png"
        alt="TYB Onboarding Flow"
        projectId="tyb-onboarding"
      />

      <ProjectImage
        src="/media/projects/tyb-onboarding/tyb-onboarding-05.png"
        alt="TYB Onboarding Flow"
        projectId="tyb-onboarding"
      />
    </div>
  );
}
