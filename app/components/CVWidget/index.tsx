'use client';
import React from 'react';
import styles from './CVWidget.module.css';
import Thought from '@/app/icons/Thought';
import Pencil from '@/app/icons/Pencil';

interface CVWidgetProps {
  className?: string;
}

export default function CVWidget({ className = '' }: CVWidgetProps) {
  return (
    <div className={`${styles.cvContainer} ${className}`}>
        <div className={styles.header}>
          <Pencil style={{ color: 'var(--secondary)' }} size={20} />
          <h3 style={{ color: 'var(--secondary)' }}>Experience</h3>
        </div>
        <div className={styles.cvItem}>
            <div className={styles.cvItemOrg}>
                <h4>
                    <a href="https://tyb.xyz" target="_blank" rel="noopener noreferrer">
                        Try Your Best
                    </a>
                </h4>
                <small style={{ color: 'var(--secondary)' }}>2024 - Present</small>
            </div>
            <p>
                I currently lead design engineering across all surface areas, spending 75% of my time in Figma, and the other 25% in code. Before that, I worked on the b2b client web-app, leading a massive redesign of the platform.     
            </p>
        </div>
        <div className={styles.cvItem}>
            <div className={styles.cvItemOrg}>
                <h4 style={{ color: 'var(--secondary)' }}>Freelance</h4>
                <small style={{ color: 'var(--secondary)' }}>2018 - Present</small>
            </div>
            <div className={styles.subProjectsContainer}>
                <div className={styles.subProject}>
                    <b>
                        <a href="https://blackbird.xyz" target="_blank" rel="noopener noreferrer">
                            Blackbird
                        </a>
                    </b>
                    <p>
                        I developed 3D assets for the Blackbird app in collaboration with product design, that acted as in-app currency.
                    </p>
                </div>
                <div className={styles.subProject}>
                    <b>
                        <a href="https://claudehome.com" target="_blank" rel="noopener noreferrer">
                            Claude Home
                        </a>
                    </b>
                    <p>
                        I designed and built an interactive gallery site for Cluade&apos;s visual art offerings. The site is built on Next.js and uses a custom 3D WebGL gallery to display product images.
                    </p>
                </div>
                <div className={styles.subProject}>
                    <b>
                        <a href="https://readsqft.com" target="_blank" rel="noopener noreferrer">
                            SQFT
                        </a>
                    </b>
                    <p>
                        I designed and built the website for interior design narrative magazine SQFT. I modeled the 3D magazine replica in Blender and built the site with React and three.js on Shopify&apos;s Hydrogen framework.
                    </p>
                </div>
            </div>
        </div>
        <div className={styles.cvItem}>
            <div className={styles.cvItemOrg}>
                <h4>
                    <a href="https://www.wk.com" target="_blank" rel="noopener noreferrer">
                        Wieden+Kennedy
                    </a>
                </h4>
                <small style={{ color: 'var(--secondary)' }}>2018 - 2019</small>
            </div>
            <p>
                Worked as a contract designer at Wieden+Kennedy in Portland on the Nike account.
            </p>
        </div>
    </div>
  );
} 