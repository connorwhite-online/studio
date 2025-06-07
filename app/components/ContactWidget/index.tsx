'use client';
import React from 'react';
import styles from './ContactWidget.module.css';
import Chat from '@/app/icons/Chat';

interface ContactWidgetProps {
  className?: string;
}

export default function ContactWidget({ className = '' }: ContactWidgetProps) {
  return (
    <div className={`${styles.contactContainer} ${className}`}>
      <div className={styles.header}>
        <Chat className={styles.icon} size={20} />
        <h2>Get in touch</h2>
      </div>
      <div className={styles.links}>
      <a 
        href="https://www.x.com/connor_online"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.link}>
          <p>Twitter ↗</p>
        </div>
      </a>
      <a 
        href="mailto:connorwhite.studio@gmail.com"
      >
        <div className={styles.link}>
          <p>Email ↗</p>
        </div>
      </a>
      <a 
        href="https://github.com/connorwhite-online"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.link}>
          <p>Github ↗</p>
        </div>
      </a>
      <a 
        href="https://www.linkedin.com/in/connorwhite-online/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className={styles.link}>
          <p>LinkedIn ↗</p>
        </div>
      </a>
      </div>
    </div>
  );
} 