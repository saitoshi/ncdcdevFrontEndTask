import styles from './page.module.css';
import Image from 'next/image';
export default function Home() {
  return (
    <div className={styles.page}>
      <div className={styles.pageContainer}>
        {/** サイドメニューの設定 */}
        <div id={styles.sideMenu} className={styles.sideMenu}>
          <div id={styles.sideContainer}>
            <h2 className={styles.sideTitle}>
              <Image
                src={'img/icon/logo.svg'}
                width={40}
                height={32}
                alt='Logo'
              />
              Service Name
            </h2>
            <div id={styles.sideButton}>Test</div>
            <br />
            <div id={styles.sideEdit}>
              <button>
                <Image
                  src={'img/icon/edit.svg'}
                  width={40}
                  height={20}
                  alt='Logo'
                />
                <br />
                Edit
              </button>
            </div>
          </div>
        </div>
        {/** コンテンツーの設定 */}
        <div id={styles.mainContent}>
          <div id={styles.mainContainer}>
            <h2 className={styles.mainTitle}>Main Title</h2>
            <div className={styles.mainText}>
              <p>Test</p>
            </div>
            <div id={styles.copyRight}>Copyright</div>
          </div>
        </div>
      </div>
    </div>
  );
}
