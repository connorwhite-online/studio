import styles from "./page.module.css";
import ProjectGalleryServer from "./server/ProjectGalleryServer";

export default function Home() {
  return (
    <main className={styles.main}>
      <ProjectGalleryServer />
    </main>
  );
}
