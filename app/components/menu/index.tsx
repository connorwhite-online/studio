'use client';
import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./menu.module.css";
import { usePathname } from "next/navigation";
import { ArchiveIcon, CubeIcon, ImageIcon, InfoCircledIcon, ReaderIcon } from "@radix-ui/react-icons";
import { Switch } from "@radix-ui/react-switch";

export default function Menu() {
    const pathname = usePathname();
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <div className={styles.menu}>
            <nav className={styles.nav}>
                <Link href="/" className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}>
                    <CubeIcon />
                </Link>
                <Link href="/projects" className={`${styles.navLink} ${pathname === '/projects' ? styles.navLinkActive : ''}`}>
                    <ReaderIcon />
                </Link>
                <Link href="/info" className={`${styles.navLink} ${pathname === '/info' ? styles.navLinkActive : ''}`}>
                    <InfoCircledIcon />
                </Link>
                <Switch
                    checked={theme === 'light'}
                    onCheckedChange={toggleTheme}
                    className={styles.themeToggle}
                />
            </nav>
        </div>
    );
}