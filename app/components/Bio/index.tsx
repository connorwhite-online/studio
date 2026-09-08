'use client';
import styles from './Bio.module.css';

export default function Bio() {
  return (
    <section className={styles.bioSection}>
      <h4 className={styles.bioLine}>
        Connor White
      </h4>
      <p className={styles.bioCopy}>
        <span className={styles.bioLine}>
          I&#39;m a software designer and engineer based in Los Angeles, California.
        </span>
        <span className={styles.bioLine}>
          Currently I&#39;m at <a href="https://vizcom.com/" target="_blank" rel="noopener noreferrer"><b>Vizcom</b></a> creating generative visual tools.
        </span>
      </p>
    </section>
  );
} 