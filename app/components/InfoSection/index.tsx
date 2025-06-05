'use client';
import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './InfoSection.module.css';
import Time from '@/app/components/Time';
import SpotifyWidget from '@/app/components/SpotifyWidget';
import clsx from 'clsx';

export default function InfoSection() {
    const [status, setStatus] = useState<string>('');
    const infoRef = useRef<HTMLDivElement>(null);
    const infoTL = useRef<gsap.core.Timeline>();

    useEffect(() => {
        const updateStatus = () => {
            // Determine status based on time and day
            const now = new Date();
            const hour = now.toLocaleString('en-US', { 
                timeZone: 'America/Los_Angeles',
                hour: 'numeric',
                hour12: false
            });
            
            const day = now.toLocaleString('en-US', {
                timeZone: 'America/Los_Angeles',
                weekday: 'long'
            });
            
            const hourNum = parseInt(hour, 10);
            const isWeekend = day === 'Saturday' || day === 'Sunday';
            
            if (hourNum >= 21 || hourNum < 8) {
                setStatus('I\'m getting a good nights sleep. Kidding, I\'m looking at vintage Japanese 4WD vehicles on FB Marketplace.');
            } else if (isWeekend && hourNum >= 8 && hourNum < 21) {
                setStatus('I\'m picking weeds in the garden and riding my bike with my son. I\'ll get back to you soon.');
            } else if (hourNum >= 8 && hourNum < 17) {
                setStatus('I\'m locked in, blasting Soulection radio, on my third cup of coffee.');
            } else {
                setStatus('I\'m offline, talk to you soon.');
            }
        };

        updateStatus();
        // Update status every 5 seconds
        const intervalId = setInterval(updateStatus, 5000);
        
        return () => clearInterval(intervalId);
    }, []);

    useGSAP(() => {
        if (!infoRef.current) return;
        infoTL.current = gsap.timeline()
        .set(infoRef.current, {
            autoAlpha: 1,
        })
        .fromTo('p', {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1.5,
            ease: 'power2.inOut',
        })
        .fromTo(`.${styles.widget}`, {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1,
            ease: 'power2.inOut',
        }, "<25%")
        .fromTo('h2, h3', {
            x: -25,
            opacity: 0,
        }, {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.1,
        }, "<25%")
    }, {dependencies: []});

    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const h3Element = e.currentTarget.querySelector('h3');
        if (h3Element) {
            gsap.to(h3Element, {
                x: 10,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const h3Element = e.currentTarget.querySelector('h3');
        if (h3Element) {
            gsap.to(h3Element, {
                x: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        }
    };

    return (
        <div ref={infoRef} className={styles.info}>
            <div className={styles.column}>
                <section className={clsx(styles.widget)}>
                    <Time showIcon={true} />
                    <p className={styles.statusText}>
                        {status}
                    </p>
                </section>
                <section className={clsx(styles.widget)}>
                <p className={styles.introCopy}>
                A design engineer obsessed with simplifying complex products and making their visual elements move beautifully.
                <br />
                <br />
                I&#39;m currently building the most fun B2B tool on the internet for community engagement platform <a href="https://www.tyb.xyz/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Try Your Best</a>.
                <br />
                <br />
                My work ranges from system design and implementation, to experiments with real-time 3D rendering and machine learning integration.
                <br />
                <br />
                I&#39;m available for select projects that make me excited to stare at a computer even longer than I already do. If you&#39;d like to talk about a project, let&#39;s connect!
                </p>
                </section>
            </div>
            <div className={styles.column}>
                <section className={clsx(styles.widget)}>
                    <a 
                        href="mailto:connorwhite.studio@gmail.com"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    >
                        <div className={styles.link}>
                            <h2>Email</h2>
                            <h3>connorwhite.studio@gmail.com ↗</h3>
                        </div>
                    </a>
                    <a 
                        href="https://instagram.com/connorwhite.online/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={styles.link}>
                            <h2>Instagram</h2>
                            <h3>@connorwhite.online ↗</h3>
                        </div>
                    </a>
                    <a 
                        href="https://www.linkedin.com/in/connorwhite-online/"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={styles.link}>
                            <h2>LinkedIn</h2>
                            <h3>/connorwhite-online ↗</h3>
                        </div>
                    </a>
                    <a 
                        href="https://www.x.com/connor_online"
                        target="_blank"
                        rel="noopener noreferrer"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        <div className={styles.link}>
                            <h2>Twitter</h2>
                            <h3>@connor_online ↗</h3>
                        </div>
                    </a>
                </section>
                <section className={clsx(styles.spotifyContainer, styles.widget)}>
                        <SpotifyWidget />
                </section>
            </div>
        </div>
    );
} 