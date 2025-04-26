'use client';
import styles from "./page.module.css";
import TimeStatus from './components/TimeStatus';

export default function Home() {
  const titleText = "Connor is a software designer and engineer, interested mostly in interaction design, both experimental and practical.";
  const words = titleText.split(' ');

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          {words.map((word, index) => (
            <span
              key={index}
              style={{
                display: 'inline-block',
                marginRight: '0.25em',
                opacity: 0,
                filter: 'blur(10px)',
                animation: `fadeInBlur 0.8s forwards ease-out`,
                animationDelay: `${index * 0.05}s`
              }}
            >
              {word}
            </span>
          ))}
        </h2>
        
        <TimeStatus showStatus={false} className={styles.timeContainer} />
      </div>
    </main>
  );
}
