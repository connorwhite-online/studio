'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./menu.module.css";
import { usePathname } from "next/navigation";
import Home from "@/app/icons/Home";
import Info from "@/app/icons/Info";
import Sun from "@/app/icons/Sun";
import Moon from "@/app/icons/Moon";
import Settings from "@/app/icons/Settings";

export default function Menu() {
    const pathname = usePathname();
    const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            localStorage.setItem('theme', 'system');
        }
        setTheme((savedTheme || 'system') as 'light' | 'dark' | 'system');
    }, []);

    useEffect(() => {
        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (theme === 'system') {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
            }
        };

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (theme === 'system') {
            document.documentElement.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }

        mediaQuery.addEventListener('change', handleSystemThemeChange);
        return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }, [theme]);

    const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    return (
        <div className={styles.menu}>
            <nav className={styles.nav}>
                <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}>
                    <Home size={24} />
                </Link>
                <Link href="/info" className={`${styles.navLink} ${pathname === '/info' ? styles.navLinkActive : ''}`}>
                    <Info size={24} />
                </Link>
                <div className={styles.themeSwitch}>
                    <button 
                        onClick={() => handleThemeChange('light')}
                        className={`${styles.themeOption} ${theme === 'light' ? styles.active : ''}`}
                        aria-label="Light theme"
                    >
                        <Sun size={16} />
                    </button>
                    <button 
                        onClick={() => handleThemeChange('dark')}
                        className={`${styles.themeOption} ${theme === 'dark' ? styles.active : ''}`}
                        aria-label="Dark theme"
                    >
                        <Moon size={16} />
                    </button>
                    <button 
                        onClick={() => handleThemeChange('system')}
                        className={`${styles.themeOption} ${theme === 'system' ? styles.active : ''}`}
                        aria-label="System theme"
                    >
                        <Settings size={16} />
                    </button>
                </div>
            </nav>
        </div>
    );
}