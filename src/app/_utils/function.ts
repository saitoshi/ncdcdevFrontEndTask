import { IContent } from './type';

/**
 * @name deleteContent()
 * @desc コンテンツを固定のIDで消す
 * @param id - コンテンツID
 * @return
 */
export const deleteContent = async (id: IContent['id']) => {
  try {
    const response = await fetch(`http://localhost:3000/content/${id}`, {
      method: 'DELETE',
    });
    if (response.status === 200) {
      await location.reload();
    }
  } catch (error) {
    return error;
  }
};

/**
 * @name updateContent()
 * @desc コンテンツのタイトルを更新する
 * @param id
 * @return 成功かエラー
 */
export const updateContent = async (
  id: IContent['id'],
  title: IContent['title'],
  body: IContent['body'],
) => {
  try {
    const input = JSON.stringify({ title: title, body: body });
    await console.log(input);
    const response = await fetch(`http://localhost:3000/content/${id}`, {
      method: 'PUT',
      body: input,
    });
    await console.log(response);
    if (response.status === 200) {
      await location.reload();
    }
  } catch (error) {
    return error;
  }
};

/**
 * @name createContent()
 * @desc コンテンツの追加用の関数
 * @param title
 * @param body
 * @return 成功かエラー
 */
export const createContent = async (title: string, body: string) => {
  try {
    const data = { title: title, body: body };
    const response = await fetch('http://localhost:3000/content', {
      method: 'POST',
      body: JSON.stringify(body),
    });
    await console.log(response);
    if (response.status === 200) {
      await location.reload();
    }
  } catch (error) {
    return error;
  }
};
