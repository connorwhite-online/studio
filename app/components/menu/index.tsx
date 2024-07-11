'use client';
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./menu.module.css";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MenuIcon from "./menu-icon";

export default function Menu() {
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);
    const [theme, setTheme] = useState('dark');
    const navRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<SVGSVGElement>(null);
    const menuTL = useRef<gsap.core.Timeline>();

    // Menu Animation Timeline
    useGSAP(() => {
        menuTL.current = gsap.timeline({paused: true})
        .fromTo(iconRef.current, {
            rotateZ: 0
        }, {
            rotateZ: 135, 
            duration: 1.25, 
            ease: "elastic.out(1,0.75)"
        })
        .set(`.${styles.subNav}`, {
            autoAlpha: 1, 
            display: "block"
        }, "<")
        .to(`.${styles.nav}`, {
            width: '250px', 
            height: '150px', 
            duration: 0.5, 
            ease: "power4.out"
        }, "<")
        .fromTo(`.${styles.navLink}`, {
            opacity: 0, 
            // transform: 'translateX(-50px)'
            x: -25
        }, {
            opacity: 1, 
            duration: .5, 
            x: 0,
            // transform: 'translateX(0px)', 
            stagger: 0.1, 
            ease: "power4.inOut"
        }, 0.25)
        .to(`.${styles.themeToggleWrapper}`, {
            autoAlpha: 1, 
            duration: 1, 
            ease: "power2.out"
        }, "<75%");
    }, { dependencies: [] });

    // Menu toggle animation
    useGSAP(() => {
        if (menuOpen) {
            // Animation for opening the menu
            menuTL.current?.timeScale(1);
            menuTL.current?.play();
        } else {
            // Reverse animation for closing the menu
            menuTL.current?.timeScale(2.5);
            menuTL.current?.reverse();
        }
    }
    , { dependencies: [menuOpen] });

    // Theme toggle handler
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={styles.menu} ref={navRef}>
            <nav className={styles.nav}>
                <div className={styles.mainNav} onClick={() => setMenuOpen(!menuOpen)} style={{ color: 'var(--icon-color)' }}>
                    <div className={styles.currentPath}>{pathname === '/' ? 'Home' : (pathname.charAt(1).toUpperCase())+(pathname.slice(2))}</div>
                    <MenuIcon ref={iconRef} className={styles.icon} />
                </div>
                <ul className={styles.subNav}>
                    <li>
                    <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`} onClick={() => setMenuOpen(false)}>
                        Home
                    </Link>
                    </li>
                    <li>
                    <Link href="/projects" className={`${styles.navLink} ${pathname === '/projects' ? styles.navLinkActive : ''}`} onClick={() => setMenuOpen(false)}>
                        Projects
                    </Link>
                    </li>
                    <li>
                    <Link href="/info" className={`${styles.navLink} ${pathname === '/info' ? styles.navLinkActive : ''}`} onClick={() => setMenuOpen(false)}>
                        Info
                    </Link>
                    </li>
                    <li className={styles.toggleListItem}>
                        <div className={styles.themeToggleWrapper}>
                            <input 
                                type="checkbox" 
                                className={styles.themeToggle} 
                                id="themeToggle" 
                                checked={theme === 'light'} 
                                onChange={toggleTheme} 
                            />
                            <label className={styles.slider} htmlFor="themeToggle"></label>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    );
}