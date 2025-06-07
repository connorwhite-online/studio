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
        
        // If theme is system, detect the system preference and set it explicitly
        if (theme === 'system') {
            const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            setTheme(systemPreference);
        }
    }, [theme, setTheme]);

    const handleThemeChange = () => {
        if (isAnimating.current) return;
        isAnimating.current = true;
        
        // Cycle only between light and dark
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

    // Get display text and icon for current theme
    const getThemeDisplay = () => {
        if (theme === 'light') {
            return {
                text: 'Light Theme',
                icon: <Sun size={16} />
            };
        } else {
            return {
                text: 'Dark Theme',
                icon: <Moon size={16} />
            };
        }
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return null;
    }

    const { text, icon } = getThemeDisplay();

    return (
        <button 
            ref={containerRef}
            onClick={handleThemeChange}
            className={styles.themeToggle}
            aria-label={`Current theme: ${text}. Click to change theme`}
        >
            <div ref={iconRef} className={styles.iconWrapper}>
                {icon}
            </div>
            <span ref={textRef} className={styles.textWrapper}>
                {text}
            </span>
        </button>
    );
}