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

const searchAlbums = async (
  search: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  // const token = localStorage.getItem('accessToken');
  await api({
    // headers: { Authorization: `Bearer ${token}` },
    method: 'get',
    url: `/albums/search/${search}`,
  })
    .then(success)
    .catch(fail);
};

export { getAlbums, searchAlbums };
