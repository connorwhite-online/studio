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
    const themeToggleRef = useRef<HTMLDivElement>(null);

    // Function to position the active background
    const positionActiveBackground = () => {
        if (!activeBackgroundRef.current || !navRef.current) return;
        
        const activeLink = navRef.current.querySelector(`.${styles.navLinkActive}`);
        if (!activeLink) return;

        const xPosition = activeLink.getBoundingClientRect().left - navRef.current.getBoundingClientRect().left - 8;

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
        if (!menuRef.current || !navRef.current || !themeToggleRef.current) return;
        
        // Get nav links and theme toggle separately
        const navLinks = navRef.current.querySelectorAll(`.${styles.navLink}`);
        
        // Make sure theme toggle is initially hidden
        gsap.set(themeToggleRef.current, { opacity: 0, filter: "blur(5px)" });
        
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
                // After active background animation completes, fade in theme toggle
                tl.add(backgroundTL)
                  .to(themeToggleRef.current, {
                      opacity: 1,
                      filter: "blur(0px)",
                      duration: 0.5,
                      ease: "power2.out"
                  }, "+=0.2");
            }
        });
        
    }, { scope: menuRef });

    // Update active background on route change
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
                <div ref={themeToggleRef} className={styles.themeToggleWrapper}>
                    <ThemeToggle />
                </div>
            </nav>
        </div>
    );
}

export default Menu;