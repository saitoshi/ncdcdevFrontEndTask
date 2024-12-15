import { IContent } from './type';

/**
 * @name deleteContent()
 * @desc コンテンツを固定のIDで消す
 * @param id - コンテンツID
 * @return
 */
export const deleteContent = async (id: IContent['id']) => {
  try {
    const contentCall = await fetch(`http://localhost:3000/content/${id}`, {
      method: 'DELETE',
    }).then(async (res) => {
      res.json();
    });
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
      //location.reload();
    }
  } catch (error) {
    return error;
  }
};
