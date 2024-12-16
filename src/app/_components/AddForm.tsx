/**
 * @name AddForm
 * @desc コンテンツ追加用パーツ
 */
'use client';
import Image from 'next/image';
import { IContent } from '../_utils/type';
import { useState, useEffect } from 'react';
import { createContent } from '../_utils/function';
export const AddForm = () => {
  const [inputTitle, setInputTitle] = useState<IContent['title']>();
  const [inputBody, setInputBody] = useState<IContent['body']>();
  const [disable, setDisable] = useState<boolean>(true);
  const [addMode, setAddMode] = useState<boolean>(false);
  return (
    <>
      <div id='editTitle'>
        <div className='inputSection'>
          <input
            className='activeForm'
            type='text'
            placeholder='コンテンツのタイトルを入力'
            onChange={(e: any) => {
              setInputTitle(e.target.value);
            }}></input>
        </div>
        <div className='buttonSection'>
          <button className='cancelButton' onClick={() => setAddMode(false)}>
            <Image
              src={'img/icon/cancel.svg'}
              width={20}
              height={20}
              alt='Logo'
            />
            <br />
            Cancel
          </button>
        </div>
      </div>
      <div id='editBody'>
        <div className='inputSection'>
          <textarea
            id='bodySection'
            className='activeBodyForm'
            onChange={(e) => {
              setInputBody(e.target.value);
            }}
            rows={4}
            cols={50}
            placeholder='コンテンツの内容を入力'></textarea>
        </div>
        <div className='buttonSection'>
          <button className='cancelButton' onClick={() => setAddMode(false)}>
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
            onClick={() => createContent(inputTitle!, inputBody!)}>
            <Image
              src={'img/icon/save.svg'}
              width={20}
              height={20}
              alt='Logo'
            />
            <br />
            Save
          </button>
        </div>
      </div>
    </>
  );
};
