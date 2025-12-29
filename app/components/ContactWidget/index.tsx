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
        <Chat style={{ color: 'var(--secondary)' }} size={20} />
        <h3 style={{ color: 'var(--secondary)' }}>Get in touch</h3>
      </div>
      <div className={styles.links}>
      <a 
        href="https://www.x.com/connor_online"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>Twitter ↗</p>
      </a>
      <a 
        href="mailto:connorwhite.studio@gmail.com"
      >
        <p>Email ↗</p>
      </a>
      <a 
        href="https://github.com/connorwhite-online"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>Github ↗</p>
      </a>
      <a 
        href="https://www.linkedin.com/in/connorwhite-online/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>LinkedIn ↗</p>
      </a>
      </div>
    </div>
  );
} 