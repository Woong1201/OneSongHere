import { AxiosResponse, AxiosError, responseEncoding } from 'axios';
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

const getCategorized = async (
  type: string,
  search: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'get',
    url: `/board/search/${type}/${search}`,
  })
    .then(success)
    .catch(fail);
};

const postArticle = async (
  title: string,
  head: string,
  content: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  if (title === '') {
    alert('게시글 제목을 입력해주세요!');
  } else if (head === '') {
    alert('카테고리를 선택해주세요!');
  } else if (content === '') {
    alert('게시글 내용을 입력해주세요!');
  } else {
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
  }
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

const deleteArticle = async (
  boardId: number,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'delete',
    url: `/board/${boardId}`,
  })
    .then(success)
    .catch(fail);
};

const deleteComment = async (
  id: number,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'delete',
    url: `/board/comments/${id}`,
  })
    .then(success)
    .catch(fail);
};

const updateArticle = async (
  boardId: number,
  boardTitle: string,
  header: string,
  boardContent: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  if (boardTitle === '') {
    alert('게시글 제목을 입력해주세요!');
  } else if (header === '') {
    alert('카테고리를 선택해주세요!');
  } else if (boardContent === '') {
    alert('게시글 내용을 입력해주세요!');
  } else {
    await api({
      headers: { Authorization: `Bearer ${token}` },
      method: 'put',
      url: '/board',
      data: {
        boardId,
        boardTitle,
        header,
        boardContent,
      },
    })
      .then(success)
      .catch(fail);
  }
};

const updateComment = async (
  commentId: number,
  commentContent: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  if (commentContent === '') {
    alert('댓글 내용을 채운 뒤 등록해주세요!');
  } else {
    const token = localStorage.getItem('accessToken');
    await api({
      headers: { Authorization: `Bearer ${token}` },
      method: 'put',
      url: '/board/comments',
      data: { commentId, commentContent },
    })
      .then(success)
      .catch(fail);
  }
};

export {
  getBoards,
  getArticle,
  getCategorized,
  postArticle,
  postComment,
  deleteArticle,
  deleteComment,
  updateArticle,
  updateComment,
};
