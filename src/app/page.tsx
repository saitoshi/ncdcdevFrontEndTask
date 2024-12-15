'use client';
import styles from './page.module.css';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { IContent } from './_utils/type';
import { updateContent } from './_utils/function';
export default function Home() {
  const [contents, setContents] = useState<IContent[]>();
  const [current, setCurrent] = useState<IContent | undefined>();
  const [load, setLoad] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<boolean>(false);
  const [editBody, setEditBody] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<IContent['title']>();
  const [currentBody, setCurrentBody] = useState<IContent['body']>();
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
    await console.log(contentData);
    await setLoad(false);
    await setCurrent(contentData[0]);
    await setCurrentTitle(contentData[0].title);
    await setCurrentBody(contentData[0].body);
  };

  const setCurrentContent = async (contents: IContent[], content: IContent) => {
    console.log(contents[content.id - 1]);
    setCurrent(contents[content.id - 1]);
    setCurrentTitle(content.title);
    setCurrentBody(content.body);
  };
  useEffect(() => {
    getContents();
  }, []);
  if (load) {
    return <div className={styles.page}></div>;
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
                    className={'fillButton'}
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
                  <button className={'outlineButton'}>
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
                    className={'fillButton'}
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
            <div id='editTitle'>
              <div className='inputSection'>
                {editTitle ? (
                  <div id='editSection'>
                    <div className='inputSection'>
                      <input
                        className='activeForm'
                        value={currentTitle}
                        onChange={(e: any) => {
                          setCurrentTitle(e.target.value);
                        }}></input>
                    </div>
                  </div>
                ) : (
                  <h2 className='mainTitle'>{currentTitle}</h2>
                )}
              </div>
              <div className='buttonSection'>
                {editTitle ? (
                  <>
                    <button
                      className='cancelButton'
                      onClick={() => setEditTitle(false)}>
                      <Image
                        src={'img/icon/cancel.svg'}
                        width={20}
                        height={20}
                        alt='Logo'
                      />
                      <br />
                      Cancel
                    </button>
                    <button
                      className='saveButton'
                      onClick={() =>
                        updateContent(current!.id, currentTitle!, current!.body)
                      }>
                      <Image
                        src={'img/icon/save.svg'}
                        width={20}
                        height={20}
                        alt='Logo'
                      />
                      <br />
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    className='activateEdit'
                    onClick={() => setEditTitle(true)}>
                    <Image
                      src={'img/icon/edit.svg'}
                      width={40}
                      height={20}
                      alt='Logo'
                    />
                    <br />
                    Edit
                  </button>
                )}
              </div>
            </div>
            <div id='editBody'>
              <div className='inputSection'>
                {editBody ? (
                  <textarea
                    id='bodySection'
                    onChange={(e: any) => {
                      setCurrentBody(e.target.value);
                    }}
                    rows={4}
                    cols={50}
                    value={currentBody}></textarea>
                ) : (
                  <p className='mainText'>{currentBody}</p>
                )}
              </div>
              <div className='buttonSection'>
                {editBody ? (
                  <>
                    <button
                      className='cancelButton'
                      onClick={() => setEditBody(false)}>
                      <Image
                        src={'img/icon/cancel.svg'}
                        width={20}
                        height={20}
                        alt='Logo'
                      />
                      <br />
                      Cancel
                    </button>
                    <button
                      className='saveButton'
                      onClick={() =>
                        updateContent(current!.id, current!.title, currentBody!)
                      }>
                      <Image
                        src={'img/icon/save.svg'}
                        width={20}
                        height={20}
                        alt='Logo'
                      />
                      <br />
                      Save
                    </button>
                  </>
                ) : (
                  <button
                    className='activateEdit'
                    onClick={() => setEditBody(true)}>
                    <Image
                      src={'img/icon/edit.svg'}
                      width={40}
                      height={20}
                      alt='Logo'
                    />
                    <br />
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
