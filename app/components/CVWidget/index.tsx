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
          <Pencil className={styles.icon} size={20} />
          <h2>Experience</h2>
        </div>
        <div className={styles.cvItem}>
            <div className={styles.cvItemOrg}>
                <h3>Try Your Best</h3>
                <small>2024 - Present</small>
            </div>
            <p>
                I currently lead design engineering across all surface areas, spending 75% of my time in Figma, and the other 25% in code. Before that, I worked on the b2b client web-app, leading a massive redesign of the platform.     
            </p>
        </div>
        <div className={styles.cvItem}>
            <div className={styles.cvItemOrg}>
                <h3>Freelance/Contract</h3>
                <small>2018 - Present</small>
            </div>
            <p>
                Client work across brand, web, and native, ranging from identity and full suite development to experimentation with machine learning and real-time 3D experiences on the web.
                <br />
                Past clients include <a href="https://www.instagram.com/byseanbrown" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Sean Brown</a>, <a href="https://www.instagram.com/claudehome" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Claude Home</a>, <a href="https://www.nike.com/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Nike</a>, and more.
            </p>
        </div>
    </div>
  );
} 