'use client';
import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './info.module.css';

export default function Info() {

    const infoRef = useRef<HTMLDivElement>(null);
    const infoTL = useRef<gsap.core.Timeline>();

    useGSAP(() => {
        if (!infoRef.current) return;
        infoTL.current = gsap.timeline()
        .set(infoRef.current, {
            autoAlpha: 1,
            // delay: 1,
        })
        .fromTo('p', {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 1.5,
            ease: 'power2.inOut',
        })
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


    return (
        <main ref={infoRef} className={styles.info}>
            <section className={styles.intro}>
                <p className={styles.introCopy}>
                I&#39;m a design engineer based in Los Angeles, currently building the future of community engagement at <a href="https://www.tyb.xyz/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>Try Your Best</a>.
                <br />
                <br />
                My work ranges from system design and implementation, to experiments with real-time 3D rendering and machine learning integration.
                <br />
                <br />
                I&#39;m available for select projects in culture and environmental advocacy. If you&#39;d like to work together, please do reach out.
                </p>
            </section>
            <section className={styles.directory}>
                <a href="mailto:connorwhite.studio@gmail.com" >
                    <div className={styles.link}>
                        <h2>Email</h2>
                        <h3>connorwhite.studio@gmail.com ↗</h3>
                    </div>
                </a>
                <a href="https://instagram.com/connorwhite.online/" target="_blank" rel="noopener noreferrer">
                    <div className={styles.link}>
                        <h2>Instagram</h2>
                        <h3>@connorwhite.online ↗</h3>
                    </div>
                </a>
                <a href="https://www.linkedin.com/in/connorwhite-online/" target="_blank" rel="noopener noreferrer">
                    <div className={styles.link}>
                        <h2>LinkedIn</h2>
                        <h3>/connorwhite-online ↗</h3>
                    </div>
                </a>
                <a href="https://www.x.com/connor_online" target="_blank" rel="noopener noreferrer">
                    <div className={styles.link}>
                        <h2>Twitter</h2>
                        <h3>@connor_online ↗</h3>
                    </div>
                </a>
            </section>
        </main>
    );
}