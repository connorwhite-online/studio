import React from 'react';
import styles from './ProjectContent.module.css';
import ProjectImage from '../ProjectImage';
import ProjectVideo from '../ProjectVideo';

export default function TybLeaderboard() {
  return (
    <div className={styles.projectContent}>
        <div className={styles.section}>
            <ProjectVideo src="/media/projects/tyb-leaderboard/tyb-leaderboard-interactions.MOV" alt="TYB Leaderboard Interactions" projectId="tyb-leaderboard" />
            <p>I handled interaction details on the leaderboard, like the springy little staggered product animation, and the scroll-snapping tabs at the top of the screen, as well as the gentle product-prize hover that makes the static screen feel a bit more dynamic.</p>
        </div>
        <ProjectImage src="/media/projects/tyb-leaderboard/tyb-leaderboard-home.PNG" alt="TYB Leaderboard Home" projectId="tyb-leaderboard" />
        <ProjectImage src="/media/projects/tyb-leaderboard/tyb-leaderboard-tabs.PNG" alt="TYB Leaderboard Tabs" projectId="tyb-leaderboard" />
        <ProjectImage src="/media/projects/tyb-leaderboard/tyb-leaderboard-modal.PNG" alt="TYB Leaderboard Modal" projectId="tyb-leaderboard" />
    </div>
  );
}