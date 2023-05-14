import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

const getAlbums = async (
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'get',
    url: '/albums',
  })
    .then(success)
    .catch(fail);
};

const postAlbum = async (
  title: string,
  content: string,
  albumSheet: Array<string>,
  genre: Array<string>,
  imgUrl: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'post',
    url: '/albums',
    data: {
      AlbumTitle: title,
      AlbumContent: content,
      albumSheet,
      tags: genre,
      AlbumUrl: imgUrl,
    },
  })
    .then(success)
    .catch(fail);
};

export { getAlbums, postAlbum };
