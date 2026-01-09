import React from 'react';
import styles from './ProjectContent.module.css';
import ProjectImage from '../ProjectImage';
import ProjectVideo from '../ProjectVideo';

export default function TybOnboarding() {
  return (
    <div className={styles.projectContent}>

      {/* Auto-loads all images from tyb-onboarding folder */}
      <ProjectImage
        src="/media/projects/tyb-onboarding/tyb-onboarding-01.png"
        alt="TYB brand admin welcome modal"
        projectId="tyb-onboarding"
        priority
      />

    <div className={styles.section}>
      <ProjectImage
        src="/media/projects/tyb-onboarding/tyb-onboarding-02.png"
        alt="Setup guide home page"
        projectId="tyb-onboarding"
      />
      <p>The setup guide page was intended to be hyper-minimal, since users would mostly be continuing through the flow from the inuitive side-menu checklist widget. <br /> Providing both a preview of upcoming steps, and allowing them a sense of accomplishment with the Create step done helps with momentum.</p>
      </div>

    <div className={styles.section}>
      <ProjectImage
        src="/media/projects/tyb-onboarding/tyb-onboarding-03.png"
        alt="Feature-intro modals"
        projectId="tyb-onboarding"
      />
      <p>Feature-intro modals help give context of essential features, their value to brands, and input required of them.</p>
    </div>

    <div className={styles.section}>
      <ProjectImage
        src="/media/projects/tyb-onboarding/tyb-onboarding-challenges.png"
        alt="Guided challenge creation"
        projectId="tyb-onboarding"
      />
      <p>We also introduced guided challenge creation, to speedrun brands through the apps core engagement loop, and teach them how to reap value from challenges.</p>
    </div>

    <div className={styles.section}>
      <ProjectImage
        src="/media/projects/tyb-onboarding/tyb-onboarding-05.png"
        alt="Guardrails for internal teams"
        projectId="tyb-onboarding"
      />
      <p>We designed for the future, but implemented the onboarding flow with guardrails so internal teams could still moderate the launch of new brands.</p>
    </div>

      <div className={styles.section}>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
        <h3>Polish</h3>
        </div>
        <ProjectVideo
          src="/media/projects/tyb-onboarding/tyb-onboarding-checklist-web.mp4"
          alt="Onboarding checklist gradient border animation"
          projectId="tyb-onboarding"
        />
        <p>I designed and implemented a cheeky gradient border animation to the menu onboarding checklist widget to draw the eye when the user was ready to move on or strayed from the flow.</p>
      </div>
    </div>
  );
}
