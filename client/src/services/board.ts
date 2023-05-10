import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

const getBoards = async (
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'get',
    url: '/board',
  })
    .then(success)
    .catch(fail);
};

const getArticle = async (
  boardId: number,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'get',
    url: `/board/${boardId}`,
  })
    .then(success)
    .catch(fail);
};

const postArticle = async (
  title: string,
  head: string,
  content: string,
  // csrfToken: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  // console.log('token :', token);
  // elseif로 alert
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'post',
    url: '/board',
    data: {
      boardTitle: title,
      header: head,
      boardContent: content,
    },
  })
    .then(success)
    .catch(fail);
};

const postComment = async (
  id: number,
  content: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  if (content === '') {
    alert('댓글 내용을 채운 뒤 등록해주세요!');
  } else {
    const token = localStorage.getItem('accessToken');
    await api({
      headers: { Authorization: `Bearer ${token}` },
      method: 'post',
      url: '/board/comments',
      data: {
        boardId: id,
        commentContent: content,
      },
    })
      .then(success)
      .catch(fail);
  }
};

export { getBoards, getArticle, postArticle, postComment };
