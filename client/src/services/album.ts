import { AxiosResponse, AxiosError } from 'axios';
import { aiApiInstance, apiInstance } from './index';

const api = apiInstance();
const aiApi = aiApiInstance();

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
  albumSheet: string,
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
      albumTitle: title,
      albumContent: content,
      albumSheet,
      tags: genre,
      albumUrl: imgUrl,
    },
  })
    .then(success)
    .catch(fail);
};

const searchAlbums = async (
  type: string,
  search: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  // const token = localStorage.getItem('accessToken');
  await api({
    // headers: { Authorization: `Bearer ${token}` },
    method: 'get',
    url: `/albums/search/${type}/${search}`,
  })
    .then(success)
    .catch(fail);
};

const createAlbumCover = async (
  text: string,
  studioId: number,
  userId: number,
  success: (response: AxiosResponse) => void,
  fail: (response: AxiosError) => void
): Promise<void> => {
  await aiApi({
    method: 'post',
    url: '/createCover',
    data: {
      studio_id: studioId,
      user_id: userId,
      text,
    },
  })
    .then(success)
    .catch(fail);
};

export { getAlbums, postAlbum, createAlbumCover, searchAlbums };
