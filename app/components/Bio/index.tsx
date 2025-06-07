'use client';
import styles from './Bio.module.css';

export default function Bio() {
  return (
    <section className={styles.bioSection}>
      <div className={styles.name}>
        Connor White
      </div>
      <div className={styles.introduction}>
        I'm a software designer and engineer, interested mostly in interaction design, both experimental and practical.
        <br />
        Currently I'm a design engineer at <a href="https://www.tyb.xyz/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>TYB</a> focusing on interaction design on the consumer native apps.
      </div>
    </section>
  );
} 