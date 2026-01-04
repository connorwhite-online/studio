'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import ArrowLeft from '@/app/icons/ArrowLeft';
import ArrowRight from '@/app/icons/ArrowRight';
import { projects, Project } from '@/app/data/projects';
import Return from '@/app/icons/Return';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const router = useRouter();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const projectId = params.id;
  const currentProject = projects.find(p => p.id === projectId);
  const currentIndex = projects.findIndex(p => p.id === projectId);
  
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : projects[projects.length - 1];
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : projects[0];

  // Trigger animation and scroll to top when project changes
  useEffect(() => {
    setIsAnimating(true);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Reset animation state after animation completes
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 750); // Match animation duration
    
    return () => clearTimeout(timer);
  }, [projectId]);

  if (!currentProject) {
    return (
      <div className={styles.page}>
        <div className={styles.scrollContainer}>
          <div className={styles.content}>
            <div className={styles.homeButtonWrapper}>
              <button className="navButton" onClick={() => router.push('/')}>
                <Return />
                <p>Home</p>
              </button>
            </div>
            <h1 className={styles.title}>Project not found</h1>
          </div>
        </div>
      </div>
    );
  }

  const handleHome = () => {
    router.push('/');
  };

  const handlePrevious = () => {
    router.push(`/projects/${prevProject.id}`);
  };

  const handleNext = () => {
    router.push(`/projects/${nextProject.id}`);
  };

  // Import the project-specific content component
  const ProjectContent = getProjectContent(projectId);

  return (
    <div className={`${styles.page} ${isAnimating ? styles.fadeIn : ''}`} key={projectId}>
      {/* Scrollable content */}
      <div className={styles.scrollContainer} ref={scrollContainerRef}>
        <div className={styles.content}>
          {/* Home button as first item */}
          <div className={styles.homeButtonWrapper}>
            <button className="navButton" onClick={handleHome}>
              <Return />
              <p>Home</p>
            </button>
          </div>

          {/* Project Header */}
          <h1 className={styles.title}>{currentProject.title}</h1>
          
          {/* Client info with logo - conditionally rendered */}
          {currentProject.client && (
            <div className={styles.clientSection}>
              {currentProject.clientLink ? (
                <a 
                  href={currentProject.clientLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.clientInfo}
                >
                  {currentProject.logo && (
                    <Image 
                      src={currentProject.logo} 
                      alt={`${currentProject.client} logo`}
                      width={30}
                      height={30}
                      className={styles.clientLogo}
                    />
                  )}
                  <span className={styles.clientName}><b>{currentProject.client}</b></span>
                </a>
              ) : (
                <div className={styles.clientInfo}>
                  {currentProject.logo && (
                    <Image 
                      src={currentProject.logo} 
                      alt={`${currentProject.client} logo`}
                      width={30}
                      height={30}
                      className={styles.clientLogo}
                    />
                  )}
                  <span className={styles.clientName}><b>{currentProject.client}</b></span>
                </div>
              )}
              {currentProject.clientDescription && (
                <p className={styles.clientDescription}>{currentProject.clientDescription}</p>
              )}
            </div>
          )}

          {/* Overview section */}
          <div className={styles.overviewSection}>
            <h4 style={{ color: 'var(--secondary)' }}>Overview</h4>
            <p className={styles.overview}>{currentProject.overview}</p>
          </div>

          {/* Team section */}
          <div className={styles.teamSection}>
            <h4 style={{ color: 'var(--secondary)' }}>Team</h4>
            <ul className={styles.teamList}>
              {currentProject.team.map((member, index) => (
                <li key={index}>
                  <p>{member}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Project-specific content */}
          {ProjectContent && <ProjectContent />}

          {/* Navigation controls */}
          <div className={styles.navigation}>
            <button className={`navButton ${styles.pageNavButton}`} onClick={handlePrevious}>
              <ArrowLeft />
              <p>Previous</p>
            </button>
            <button className={`navButton ${styles.pageNavButton}`} onClick={handleNext}>
              <p>Next</p>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get project content component
function getProjectContent(projectId: string) {
  // Import project content components
  const TybOnboarding = require('@/app/components/projects/tyb-onboarding').default;
  const TybIntegrations = require('@/app/components/projects/tyb-integrations').default;
  const WebglGallery = require('@/app/components/projects/webgl-gallery').default;

  const projectComponents: Record<string, React.ComponentType> = {
    'tyb-onboarding': TybOnboarding,
    'tyb-integrations': TybIntegrations,
    'webgl-gallery': WebglGallery,
  };

  return projectComponents[projectId] || null;
}

