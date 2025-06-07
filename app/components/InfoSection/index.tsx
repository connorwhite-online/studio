'use client';
import React from 'react';
import styles from './InfoSection.module.css';
import StatusWidget from '@/app/components/StatusWidget';
import SpotifyWidget from '@/app/components/SpotifyWidget';
import ContactWidget from '@/app/components/ContactWidget';
import CVWidget from '@/app/components/CVWidget';
import clsx from 'clsx';

export default function InfoSection() {

    return (
        <div className={styles.info}>
            <section className={clsx(styles.widget)}>
                <StatusWidget />
            </section>
            <section className={clsx(styles.widget)}>
                <CVWidget />
            </section>
            <section className={clsx(styles.widget)}>
                <ContactWidget />
            </section>
            <section className={clsx(styles.widget)}>
                <SpotifyWidget />
            </section>
        </div>
    );
} 