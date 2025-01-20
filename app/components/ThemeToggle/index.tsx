'use client';
import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import styles from "./themetoggle.module.css";
import Sun from "@/app/icons/Sun";
import Moon from "@/app/icons/Moon";
import gsap from "gsap";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const iconRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLButtonElement>(null);
    const isAnimating = useRef(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleThemeChange = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        
        const newTheme = theme === 'light' ? 'dark' : 'light';

        // Create a timeline for synchronized animations
        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating.current = false;
            }
        });

        // Reset rotation before animating
        tl.set(iconRef.current, { rotation: 0 })
          .to(iconRef.current, {
              rotate: 360,
              duration: 0.6,
              ease: "power4.out",
              delay: 0.1
          }, 0)
          .to(textRef.current, {
              y: -5,
              opacity: 0,
              duration: 0.25,
              ease: "power4.out",
              onComplete: () => {
                setTheme(newTheme);
            }
          }, 0)
          .set(textRef.current, { y: 5 })
          .to(textRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power4.out",
          });
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return null;
    }

    return (
        <button 
            ref={containerRef}
            onClick={handleThemeChange}
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
            <div ref={iconRef} className={styles.iconWrapper}>
                {theme === 'light' ? (
                    <Sun size={16} />
                ) : (
                    <Moon size={16} />
                )}
            </div>
            <span ref={textRef} className={styles.textWrapper}>
                {theme === 'light' ? 'Light' : 'Dark'}
            </span>
        </button>
    );
}