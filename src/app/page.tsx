import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        <div id={styles.sideMenu} className={styles.sideMenu}>
          Side menu
        </div>
        <div id={styles.mainContent}>Main Content</div>
      </div>
    </div>
  );
}
