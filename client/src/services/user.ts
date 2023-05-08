import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance, loginApiInstance } from './index';

const api = apiInstance();

const getLogin = async (
  code: string,
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'get',
    url: '/user/auth/google',
    headers: { code: `${code}` },
  })
    .then(success)
    .catch(fail);
};

export { getLogin };

// const loginApi = loginApiInstance();

// const handleLogin = async (
//   customUrl: string,
//   success: (response: AxiosResponse) => void,
//   fail: (error: AxiosError) => void
// ): Promise<void> => {
//   await loginApi({
//     method: 'get',
//     url: customUrl,
//   })
//     .then(success)
//     .catch(fail);
// };

// export { handleLogin };
