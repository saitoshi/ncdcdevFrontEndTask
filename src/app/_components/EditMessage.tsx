'use client';
import { useState } from 'react';
import { IContent } from '../_utils/type';
import './style.css';
import { updateContent } from '../_utils/function';
import Image from 'next/image';
export const EditMessage = ({
  id,
  title,
  body,
}: {
  id: number;
  title: string;
  body: string;
}) => {
  const [contentBody, setContentBody] = useState(body);
  const [editMode, setEditMode] = useState<boolean>(false);
  /**
   * @name updateBody
   * @desc
   * @param id
   * @param contentBody
   */
  const updateBody = async (id: number, contentBody: string) => {
    await updateContent(id, title, contentBody);
  };
  return (
    <div id='editBody'>
      <div className='inputSection'>
        {editMode ? (
          <textarea
            id='bodySection'
            onChange={(e: any) => {
              setContentBody(e.target.value);
            }}
            rows={4}
            cols={50}
            value={contentBody}></textarea>
        ) : (
          <p className='mainText'>{contentBody}</p>
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
              onClick={() => updateBody(id, contentBody)}>
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
