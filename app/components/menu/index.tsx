'use client';
import React, { useState, useRef, use } from "react";
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
            gsap.to(iconRef.current, { rotateZ: 315, duration: 1.25, ease: "elastic.out(1,0.75)"});
            gsap.to([`.${styles.navLink}`, `.${styles.navLinkActive}`], {autoAlpha: 1, display: "block", duration: 1, stagger: 0.05, ease: "power2.out"});
        } else {
            // Reverse animation for closing the menu
            gsap.to([`.${styles.navLink}`, `.${styles.navLinkActive}`], {autoAlpha: 0, display: 'none', duration: 0.25, stagger: 0.05, ease: "power2.out"});
            gsap.to(iconRef.current, { rotateZ: 0, duration: 1.5, ease: "elastic.out(1,0.5)"});
        }
    }, [menuOpen]);

    return (
        <div className={styles.menu}>
            <nav className={styles.nav}>
            <Link href="/" className={`link ${pathname === '/' ? styles.navLinkActive : styles.navLink}`} onClick={() => setMenuOpen(false)}>
                Home
            </Link>
            <Link href="/work" className={`link ${pathname === '/work' ? styles.navLinkActive : styles.navLink}`} onClick={() => setMenuOpen(false)}>
                Work
            </Link>
            <Link href="/info" className={`link ${pathname === '/info' ? styles.navLinkActive : styles.navLink}`} onClick={() => setMenuOpen(false)}>
                Info
            </Link>
            <MenuIcon ref={iconRef} onClick={() => setMenuOpen(!menuOpen)} className={styles.icon} />
            </nav>
        </div>
    );
}