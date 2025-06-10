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
                <p>Try Your Best</p>
                <small>2024 - now</small>
            </div>
            <p style={{color: 'var(--gray-900)', fontFamily: 'var(--light)'}}>
                I currently lead design engineering on the consumer app team, focusing mostly on interaction and visual excellence. Before that, I worked on the b2b client web-app, leading a massive redesign of the platform.     
            </p>
        </div>
        <div className={styles.cvItem}>
            <div className={styles.cvItemOrg}>
                <p>Freelance</p>
                <small>2018 - 2024</small>
            </div>
            <p style={{color: 'var(--gray-900)', fontFamily: 'var(--light)'}}>
                Client work across web and native, ranging from identity and full suite development to experimentation with machine learning and 3D rendering.
            </p>
        </div>
    </div>
  );
} 