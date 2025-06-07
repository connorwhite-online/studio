'use client';
import styles from './Bio.module.css';

export default function Bio() {
  return (
    <section className={styles.bioSection}>
      <h1>
        Connor White
      </h1>
      <p>
        I&#39;m a software designer and engineer based in Los Angeles.
        <br />
        Currently, I&#39;m a design engineer at <a href="https://www.tyb.xyz/" target="_blank" rel="noopener noreferrer" className={styles.inlineLink}>TYB</a> focusing on interaction design and obsessing over all the little details that make an app feel enjoyable to interact with.
      </p>
    </section>
  );
} 