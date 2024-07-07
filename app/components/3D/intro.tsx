'use client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import React, { useRef } from 'react';

const Intro: React.FC = () => {

    const introRef = useRef<HTMLDivElement>(null);
    const introTL = useRef<gsap.core.Timeline>();

    useGSAP(() => {
        if (!introRef.current) return;
        introTL.current = gsap.timeline()
        .set(introRef.current, {
            autoAlpha: 1,
            delay: 1,
        })
        .fromTo('h3', {
            clipPath: 'inset(0 0 100% 0)',
            y: 25,
        }, {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            duration: 1,
            ease: 'power4.out',
            stagger: 0.5,
        })
        .fromTo('hr', {
            clipPath: 'inset(0 100% 0 0)',
        }, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1,
            ease: 'power4.out',
        }, "<25%")
        .fromTo('h2', {
            visibility: 'hidden',
        }, {
            autoAlpha: 1,
            duration: 1,
        }, "<50%")
    }, {dependencies: []});

    return (
        <div ref={introRef} className="wrapper" style={{zIndex: 98, visibility: 'hidden'}}>
            <div className='introCopy' style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', clipPath: 'inset(0)'}}><h3 style={{textWrap: 'nowrap'}}>CONNOR WHITE</h3><hr style={{width: '100%', margin: '0 5px'}}/><h3>STUDIO</h3></div>
                <h2 style={{widows: 2}}>Independent designer and engineer <br/> building interactive web experiences.</h2>
                <h3>Los Angeles, California</h3>
            </div>
        </div>
    )
};

export default Intro;