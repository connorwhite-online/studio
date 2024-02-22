'use client';
import Link from "next/link";
import styles from "./menu.module.css";
import { usePathname } from "next/navigation";

export default function Menu() {
    const pathname = usePathname();

    return (
        <div className={styles.menu}>
            <nav className={styles.nav}>
            <Link href="/" className={`link ${pathname === '/' ? styles.navLinkActive : styles.navLink}`}>
                Home
            </Link>
            <Link href="/work" className={`link ${pathname === '/work' ? styles.navLinkActive : styles.navLink}`}>
                Work
            </Link>
            <Link href="/info" className={`link ${pathname === '/info' ? styles.navLinkActive : styles.navLink}`}>
                Info
            </Link>
            </nav>
        </div>
    );
}