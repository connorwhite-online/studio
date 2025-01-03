'use client';
import React, { useRef, useEffect } from "react";
import Link from "next/link";
import styles from "./menu.module.css";
import { usePathname } from "next/navigation";
import Home from "@/app/icons/Home";
import Info from "@/app/icons/Info";
import ThemeToggle from "../ThemeToggle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
    const pathname = usePathname();
    const activeBackgroundRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Initial reveal animation
    useGSAP(() => {
        if (!menuRef.current) return;

        gsap.set(menuRef.current, {
            opacity: 0,
            clipPath: 'polygon(100% 0, 100% 0, 100% 0, 100% 0)'
        });

        gsap.to(menuRef.current, {
            opacity: 1,
            clipPath: 'polygon(200% -100%, -100% -100%, -100% 200%, 200% 200%)',
            duration: 1.2,
            ease: 'power3.out',
            delay: 0.2
        });
    }, { scope: menuRef });

    // Your existing active background animation
    useEffect(() => {
        if (!activeBackgroundRef.current || !navRef.current) return;
        
        const activeLink = navRef.current.querySelector(`.${styles.navLinkActive}`);
        if (!activeLink) return;

        const xPosition = activeLink.getBoundingClientRect().left - navRef.current.getBoundingClientRect().left - 8;

        gsap.timeline()
            .to(activeBackgroundRef.current, {
                scaleY: 0.75,
                scaleX: 2,
                duration: 0.075,
                ease: "power2.in"
            }, 0)
            .to(activeBackgroundRef.current, {
                scaleY: 1,
                scaleX: 1,
                duration: 0.1,
                ease: "power2.out"
            }, 0.075)
            .to(activeBackgroundRef.current, {
                x: xPosition,
                width: activeLink.getBoundingClientRect().width,
                duration: 1,
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
                <Link href="/info" className={`${styles.navLink} ${pathname === '/info' ? styles.navLinkActive : ''}`}>
                    <Info size={24} />
                </Link>
                <ThemeToggle />
            </nav>
        </div>
    );
}

export default Menu;