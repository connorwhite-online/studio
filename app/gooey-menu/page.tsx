'use client';
import React, { useRef, useEffect, useState } from "react";
import Home from "@/app/icons/Home";
import Info from "@/app/icons/Info";
import Touch from "@/app/icons/Touch";
import Settings from "@/app/icons/Settings";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./gooey-menu.module.css";

interface GooeyMenuProps {}

const GooeyMenu: React.FC<GooeyMenuProps> = () => {
    const [activeItem, setActiveItem] = useState('home');
    const activeBackgroundRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Function to position the active background
    const positionActiveBackground = () => {
        if (!activeBackgroundRef.current || !navRef.current) return;
        
        const activeLink = navRef.current.querySelector(`.${styles.navLinkActive}`);
        if (!activeLink) return;

        const xPosition = activeLink.getBoundingClientRect().left - navRef.current.getBoundingClientRect().left-9;

        return gsap.timeline()
            .set(activeBackgroundRef.current, { 
                autoAlpha: 1,
                x: xPosition,
                width: activeLink.getBoundingClientRect().width
            })
            .to(activeBackgroundRef.current, {
                scaleY: 0.85,
                scaleX: 1.25,
                duration: 0.075,
                ease: "power2.in",
            }, 0)
            .to(activeBackgroundRef.current, {
                scaleY: 1,
                scaleX: 1,
                duration: 0.1,
                ease: "power2.out"
            }, 0.085);
    };

    // Initial loading animation
    useGSAP(() => {
        if (!menuRef.current || !navRef.current) return;
        
        // Get nav links
        const navLinks = navRef.current.querySelectorAll(`.${styles.navLink}`);
        
        const tl = gsap.timeline();
        
        // First scale up the container on x-axis only
        tl.fromTo(navRef.current, {
            scaleX: 0.60,
            opacity: 0,
        }, {
            scaleX: 1,
            opacity: 1,
            duration: 0.5,
            ease: "elastic.out(1.5, 1)"
        });
        
        // Then fade in the navigation icons from left to right with blur effect
        tl.fromTo(navLinks, {
            opacity: 0,
            filter: "blur(5px)",
            scale: 0.75,
        }, {
            opacity: 1,
            filter: "blur(0px)",
            scale: 1,
            duration: 0.5,
            stagger: 0.15,
            ease: "elastic.out(1.5, 1)"
        }, "<25%");
        
        // Show the active background after all nav items are visible
        tl.call(() => {
            const backgroundTL = positionActiveBackground();
            if (backgroundTL) {
                tl.add(backgroundTL);
            }
        });
        
    }, { scope: menuRef });

    // Update active background when active item changes
    useEffect(() => {
        if (!activeBackgroundRef.current || !navRef.current) return;
        
        const activeLink = navRef.current.querySelector(`.${styles.navLinkActive}`);
        if (!activeLink) return;

        const xPosition = activeLink.getBoundingClientRect().left - navRef.current.getBoundingClientRect().left-9;

        gsap.timeline()
            .to(activeBackgroundRef.current, {
                scaleY: 0.85,
                scaleX: 1.25,
                duration: 0.075,
                ease: "power2.in",
            }, 0)
            .to(activeBackgroundRef.current, {
                scaleY: 1,
                scaleX: 1,
                duration: 0.1,
                ease: "power2.out"
            }, 0.085)
            .to(activeBackgroundRef.current, {
                x: xPosition,
                width: activeLink.getBoundingClientRect().width,
                duration: 0.75,
                ease: "elastic.out(1, 1)"
            }, 0);
    }, [activeItem]);

    return (
        <div className={styles.menu} ref={menuRef}>
            <nav className={styles.nav} ref={navRef}>
                <div className={styles.activeBackground} ref={activeBackgroundRef}></div>
                <button 
                    onClick={() => setActiveItem('home')} 
                    className={`${styles.navLink} ${activeItem === 'home' ? styles.navLinkActive : ''}`}
                >
                    <Home size={24} />
                </button>
                <button 
                    onClick={() => setActiveItem('interactions')} 
                    className={`${styles.navLink} ${activeItem === 'interactions' ? styles.navLinkActive : ''}`}
                >
                    <Touch size={24} />
                </button>
                <button 
                    onClick={() => setActiveItem('info')} 
                    className={`${styles.navLink} ${activeItem === 'info' ? styles.navLinkActive : ''}`}
                >
                    <Info size={24} />
                </button>
                <button 
                    onClick={() => setActiveItem('settings')} 
                    className={`${styles.navLink} ${activeItem === 'settings' ? styles.navLinkActive : ''}`}
                >
                    <Settings size={24} />
                </button>
            </nav>
        </div>
    );
}

export default function GooeyMenuPage() {
    return (
        <div className={styles.gooeyMenuContainer}>
            <GooeyMenu />
        </div>
    );
} 