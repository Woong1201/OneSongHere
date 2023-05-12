import { AxiosResponse, AxiosError } from 'axios';
import Note from 'types/Note';
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

const postNotes = async (
  notes: Note[],
  success: (response: AxiosResponse) => void,
  fail: (response: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'post',
    url: '/relayStudio/test',
    data: { notes },
  })
    .then(success)
    .catch(fail);
};

export { postRelayStudio, getRelayStudioList, postNotes };
