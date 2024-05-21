'use client';
import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "./menu.module.css";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MenuIcon from "./menu-icon";

export default function Menu() {
    const pathname = usePathname();

    const [menuOpen, setMenuOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const iconRef = useRef<SVGSVGElement>(null);
    const menuTL = useRef<gsap.core.Timeline>();

    // Menu Animation Timeline
    useGSAP(() => {
        menuTL.current = gsap.timeline({paused: true})
        .to(iconRef.current, {rotateZ: 135, duration: 1.25, ease: "elastic.out(1,0.75)"})
        .set(`.${styles.subNav}`, {autoAlpha: 1, display: "block"}, "<")
        .to(navRef.current, {width: '250px', height: '125px', duration: 0.5, ease: "power4.out"}, "<")
        .to(`.${styles.navLink}`, {autoAlpha: 1, display: "block", duration: 1, transform: 'translateY(0px)', stagger: 0.1, ease: "power2.out"}, 0.2);
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

    return (
        <div className={styles.menu}>
            <nav className={styles.nav} ref={navRef}>
                <div className={styles.mainNav} onClick={() => setMenuOpen(!menuOpen)}>
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
                </ul>
            </nav>
        </div>
    );
}