'use client';
import styles from './page.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IContent } from './_utils/type';
import { EditTitle } from './_components/EditTitle';
import { EditMessage } from './_components/EditMessage';
export default function Home() {
  const [contents, setContents] = useState<IContent[]>();
  const [current, setCurrent] = useState<IContent | undefined>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [load, setLoad] = useState<boolean>(true);
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
    await setLoad(false);
  };

  const setCurrentContent = async (contents: IContent[], content: IContent) => {
    await console.log(contents[content.id - 1]);
    await setCurrent(contents[content.id - 1]);
  };
  useEffect(() => {
    getContents();
  }, []);
  if (load) {
    return <div> Loading</div>;
  }
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
            <EditTitle
              id={current!.id}
              title={current!.title}
              body={current!.body}
            />
            <EditMessage
              id={current!.id}
              title={current!.title}
              body={current!.body}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
