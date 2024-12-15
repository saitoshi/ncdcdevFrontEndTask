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
