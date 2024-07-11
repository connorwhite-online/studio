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
                I&#39;m an independent designer and engineer based in Los Angeles, currently building web experiences with a focus on motion, interaction, and real-time 3D rendering. I work with small and large teams to produce experiences that balance a high level of craft with practicality.
                <br />
                <br />
                My design ethos is rooted in stark minimalism that allows the space for simple elements to exhibit their elegance. Intuitive usability is the foundation of all my visual decisions and motion design.
                <br />
                <br />
                Most products being built today are momentary, ill-considered, wastes of precious resources. Moving forward, I&#39;m prioritizing projects and people bringing beauty into the world or working to leave our planet in better shape than they found it. 
                <br />
                <br />
                If that&#39;s you, I&#39;d love to hear from you!
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