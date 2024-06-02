'use client';
import Scene from "./components/3D/scene";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Scene />
    </main>
  );
}
