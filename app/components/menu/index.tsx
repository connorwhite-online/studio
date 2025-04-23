'use client';
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./menu.module.css";
import { usePathname } from "next/navigation";
import Home from "@/app/icons/Home";
import Info from "@/app/icons/Info";
import Touch from "@/app/icons/Touch";
import ThemeToggle from "../ThemeToggle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
    const pathname = usePathname();
    const activeBackgroundRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Your existing active background animation
    useEffect(() => {
        if (!activeBackgroundRef.current || !navRef.current) return;
        
        const activeLink = navRef.current.querySelector(`.${styles.navLinkActive}`);
        if (!activeLink) return;

        const xPosition = activeLink.getBoundingClientRect().left - navRef.current.getBoundingClientRect().left - 8;

        gsap.timeline()
            .to(activeBackgroundRef.current, {
                scaleY: 0.85,
                scaleX: 1.25,
                duration: 0.075,
                ease: "power2.in",
                // delay: 0.01
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
    }, [pathname]);

    return (
        <div className={styles.menu} ref={menuRef}>
            <nav className={styles.nav} ref={navRef}>
                <div className={styles.activeBackground} ref={activeBackgroundRef}></div>
                <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}>
                    <Home size={24} />
                </Link>
                <Link href="/interactions" className={`${styles.navLink} ${pathname === '/interactions' ? styles.navLinkActive : ''}`}>
                    <Touch size={24} />
                </Link>
                <Link href="/info" className={`${styles.navLink} ${pathname === '/info' ? styles.navLinkActive : ''}`}>
                    <Info size={24} />
                </Link>
                <ThemeToggle />
            </nav>
        </div>
    );
}

export default Menu;