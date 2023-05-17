import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

const getLogin = async (
  code: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'get',
    url: '/user/auth/callback/google',
    params: { code },
  })
    .then(success)
    .catch(fail);
};

export { getLogin };
