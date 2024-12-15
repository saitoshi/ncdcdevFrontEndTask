'use client';
import { useState } from 'react';
import { IContent } from '../_utils/type';
import { updateContent } from '../_utils/function';
import './style.css';
import Image from 'next/image';
export const EditTitle = ({
  id,
  title,
  body,
}: {
  id: number;
  title: string;
  body: string;
}) => {
  const [contentTitle, setContentTitle] = useState<IContent['title']>(title);
  const [editMode, setEditMode] = useState<boolean>(false);
  return (
    <div id='editSection'>
      <div className='inputSection'>
        {editMode ? (
          <input
            className='activeForm'
            value={contentTitle}
            onChange={(e: any) => {
              console.log(e.target.value);
              setContentTitle(e.target.value);
            }}></input>
        ) : (
          <h2 className='mainTitle'>{title}</h2>
        )}
      </div>
      <div className='buttonSection'>
        {editMode ? (
          <>
            <button className='cancelButton' onClick={() => setEditMode(false)}>
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
              onClick={async () => {
                await console.log(contentTitle);
                await updateContent(id, contentTitle!, body);
              }}>
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
          <button className='activateEdit' onClick={() => setEditMode(true)}>
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
  );
};
