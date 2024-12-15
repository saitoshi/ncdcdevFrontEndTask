'use client';
import styles from './page.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IContent } from './_utils/type';
export default function Home() {
  const [contents, setContents] = useState<IContent[]>();
  const [current, setCurrent] = useState<IContent | undefined>();
  const [editMode, setEditMode] = useState<boolean>(false);
  /**
   * @name getContents()
   * @desc 登録されているコンテンツを取り出す
   * @return 全てのコンテンツ
   */
  const getContents = async () => {
    const contentCall = await fetch('http://localhost:3000/content', {
      method: 'GET',
    });
    const contentData = await contentCall.json();
    await setContents(contentData);
    await setCurrent(contentData[0]);
  };

  const setCurrentContent = async (contents: IContent[], content: IContent) => {
    console.log(contents[content.id - 1]);
    setCurrent(contents[content.id - 1]);
  };
  useEffect(() => {
    getContents();
  }, []);
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
            {contents?.map((content) => {
              return (
                <div
                  onClick={() => setCurrentContent(contents, content)}
                  className={
                    current?.id !== content.id
                      ? styles.sideButton
                      : styles.activeButton
                  }
                  key={content.id}>
                  <p>{content.title}</p>
                </div>
              );
            })}

            <div id={styles.sideEdit}>
              {!editMode ? (
                <div id={styles.editActivate}>
                  <button
                    className={styles.fillButton}
                    onClick={() => setEditMode(true)}>
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
              ) : (
                <div id={styles.newPageEdit}>
                  <button className={styles.outlineButton}>
                    <Image
                      src={'img/icon/+.svg'}
                      width={40}
                      height={20}
                      alt='Logo'
                    />
                    <br />
                    New Page
                  </button>
                  <div className='divider' />
                  <button
                    className={styles.fillButton}
                    onClick={() => setEditMode(false)}>
                    <Image
                      src={'img/icon/done.svg'}
                      width={40}
                      height={20}
                      alt='Logo'
                    />
                    <br />
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        {/** コンテンツーの設定 */}
        <div id={styles.mainContent}>
          <div id={styles.mainContainer}>
            <div className={styles.contentArea}>
              <h2 className={styles.mainTitle}>{current?.title}</h2>
              <div className={styles.mainText}>
                <p>{current?.body}</p>
              </div>
            </div>
            <div className={styles.editArea}>
              <button className={styles.fillButton}>
                <Image
                  src={'img/icon/edit.svg'}
                  width={40}
                  height={20}
                  alt='Logo'
                />
                <br />
                Edit
              </button>

              <button className={styles.fillButton}>
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
      </div>
    </div>
  );
}
