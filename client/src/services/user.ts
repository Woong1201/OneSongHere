import { AxiosResponse, AxiosError } from 'axios';
import { apiInstance } from './index';

const api = apiInstance();

const handleGoogleLogin = async (
  success: (response: AxiosResponse) => void,
  fail: (error: AxiosError) => void
): Promise<void> => {
  await api({
    method: 'get',
    url: '/user/loginUrl/google',
  })
    .then(success)
    .catch(fail);
};

export { handleGoogleLogin };
