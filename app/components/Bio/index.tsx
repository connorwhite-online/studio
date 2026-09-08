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
        Currently, I&#39;m at <a href="https://vizcom.com/" target="_blank" rel="noopener noreferrer"><b>Vizcom</b></a> creating tools for industrial designers and beyond.
        <br />
        I&#39;ve also worked with <a href="https://www.instagram.com/byseanbrown" target="_blank" rel="noopener noreferrer"><b>Sean Brown</b></a>, <a href="https://www.blackbird.xyz/" target="_blank" rel="noopener noreferrer"><b>Blackbird</b></a>, <a href="https://www.nike.com/" target="_blank" rel="noopener noreferrer"><b>Nike</b></a>, and more.
        <br />
        I&#39;m not available for any type of project or engagement.
      </p>
    </section>
  );
} 