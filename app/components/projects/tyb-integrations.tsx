import React from 'react';
import styles from './ProjectContent.module.css';
import ProjectImage from '../ProjectImage';

export default function TybIntegrations() {
  return (
    <div className={styles.projectContent}>

      <ProjectImage
        src="/media/projects/tyb-integrations/tyb-integrations-01.png"
        alt="Integrations default view, disconnected from all."
        projectId="tyb-integrations"
        priority
      />

      <ProjectImage
        src="/media/projects/tyb-integrations/tyb-integrations-02.png"
        alt="Storefront integration setup flow"
        projectId="tyb-integrations"
      />

<div className={styles.section}>
      <ProjectImage
        src="/media/projects/tyb-integrations/tyb-integrations-03.png"
        alt="Average order value setup flow"
        projectId="tyb-integrations"
      />
      <p>Brand reward economics are powered by their Shopify AOV. To empower all other settings in the app, percolating this input as soon as possible aided immensely in decreasing brand time-to-value.</p>
      </div>

      <div className={styles.section}>
      <ProjectImage
        src="/media/projects/tyb-integrations/tyb-integrations-04.png"
        alt="Shopify configuration settings"
        projectId="tyb-integrations"
      />
      <p>A reworked Shopify configuration settings form puts power in hands of brands to control how much or how little users can apply rewards to purchases on their storefront.</p>
      </div>

      <div className={styles.section}>
      <ProjectImage
        src="/media/projects/tyb-integrations/tyb-integrations-05.png"
        alt="All integrations connected"
        projectId="tyb-integrations"
      />
      <p>Once configured, integrations give context at a glance as to which storefront is connected to TYB, and how many of their Shopify collections they have selected to appear in the app</p>
      </div>
    </div>
  );
}
