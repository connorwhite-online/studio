'use client';
import styles from './Bio.module.css';

export default function Bio() {
  return (
    <section className={styles.bioSection}>
      <h4>
        Connor White
      </h4>
      <p>
        I&#39;m a software designer and engineer based in Los Angeles, California.
        <br />
        Currently, I&#39;m at <a href="https://www.tyb.xyz/" target="_blank" rel="noopener noreferrer"><b>Try Your Best</b></a> designing the future of brand loyalty, and obsessing over all the little details that make software feel enjoyable.
        <br />
        I&#39;ve also worked with <a href="https://www.instagram.com/byseanbrown" target="_blank" rel="noopener noreferrer"><b>Sean Brown</b></a>, <a href="https://www.blackbird.xyz/" target="_blank" rel="noopener noreferrer"><b>Blackbird</b></a>, <a href="https://www.nike.com/" target="_blank" rel="noopener noreferrer"><b>Nike</b></a>, and more.
      </p>
    </section>
  );
} 