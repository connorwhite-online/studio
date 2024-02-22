import Menu from "./components/menu";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <Menu />
    </main>
  );
}
