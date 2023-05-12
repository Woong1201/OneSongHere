import { AxiosResponse, AxiosError } from 'axios';
import { relayNotes } from 'types/Note';
import { apiInstance } from './index';

const api = apiInstance();

const postRelayStudio = async (
  title: string,
  limitOfUsers: number,
  numberOfBars: number,
  genre: Array<string>,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'post',
    url: '/relayStudios',
    data: {
      relayStudioTitle: title,
      limitOfUsers,
      numberOfBars,
      tags: genre,
    },
  })
    .then(success)
    .catch(fail);
};

const getRelayStudioList = async (
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'get',
    url: '/relayStudios',
  })
    .then(success)
    .catch(fail);
};

const getRelayStudioInfo = async (
  relayStudioId: number,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'get',
    url: `/relayStudios/${relayStudioId}`,
  })
    .then(success)
    .catch(fail);
};

const getStudioSearchResult = async (
  type: string,
  search: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  const token = localStorage.getItem('accessToken');
  await api({
    headers: { Authorization: `Bearer ${token}` },
    method: 'get',
    url: `/relayStudios/search/${type}/${search}`,
  })
    .then(success)
    .catch(fail);
};

const postNotes = async (
  data: relayNotes,
  success: (response: AxiosResponse) => void,
  fail: (response: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'post',
    url: '/relayStudio/test',
    data: { data },
  })
    .then(success)
    .catch(fail);
};

export {
  postRelayStudio,
  getRelayStudioList,
  getRelayStudioInfo,
  getStudioSearchResult,
  postNotes,
};
