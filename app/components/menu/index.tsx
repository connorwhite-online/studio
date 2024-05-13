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
    const iconRef = useRef<SVGSVGElement>(null);

    // Menu toggle animation
    useGSAP(() => {
        if (menuOpen) {
            // Animation for opening the menu
            gsap.to(iconRef.current, { rotateZ: 135, duration: 1.25, ease: "elastic.out(1,0.75)"});
            gsap.to(`.${styles.subNav}`, {autoAlpha: 1, display: "block", width: '250px', duration: 0.25, ease: "power2.out"});
            gsap.to([`.${styles.navLink}`, `.${styles.navLinkActive}`], {autoAlpha: 1, display: "block", duration: 1, stagger: 0.05, ease: "power2.out"});
        } else {
            // Reverse animation for closing the menu
            gsap.to([`.${styles.navLink}`, `.${styles.navLinkActive}`], {autoAlpha: 0, display: 'none', duration: 0.25, stagger: 0.05, ease: "power2.out"});
            gsap.to(`.${styles.subNav}`, {autoAlpha: 1, display: "none", width: '0px', delay: 0.5, duration: 0.5, ease: "power2.out"});
            gsap.to(iconRef.current, { rotateZ: 0, duration: 1.5, ease: "elastic.out(1,0.5)"});
        }
    }, [menuOpen]);

    // Diagnosing the pathname equation
    console.log((pathname.charAt(1).toUpperCase())+(pathname.slice(2)))

    return (
        <div className={styles.menu}>
            <nav className={styles.nav}>
            <div className={styles.mainNav}>
                <div className={styles.currentPath}>{pathname === '/' ? 'Home' : (pathname.charAt(1).toUpperCase())+(pathname.slice(2))}</div>
                <MenuIcon ref={iconRef} onClick={() => setMenuOpen(!menuOpen)} className={styles.icon} />
            </div>
            <ul className={styles.subNav}>
                <li>
                <Link href="/" className={`link ${pathname === '/' ? styles.navLinkActive : styles.navLink}`} onClick={() => setMenuOpen(false)}>
                    Home
                </Link>
                </li>
                <li>
                <Link href="/projects" className={`link ${pathname === '/projects' ? styles.navLinkActive : styles.navLink}`} onClick={() => setMenuOpen(false)}>
                    Projects
                </Link>
                </li>
                <li>
                <Link href="/info" className={`link ${pathname === '/info' ? styles.navLinkActive : styles.navLink}`} onClick={() => setMenuOpen(false)}>
                    Info
                </Link>
                </li>
            </ul>
            
            </nav>
        </div>
    );
}