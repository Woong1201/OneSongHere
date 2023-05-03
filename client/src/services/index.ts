import axios, { AxiosInstance } from 'axios';

const URL = 'http://onesonghere.r-e.kr:8080/api/v1';

// application/json 타입
const apiInstance = (): AxiosInstance => {
  const AxiosInst = axios.create({
    baseURL: URL,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return AxiosInst;
};

// multipart/form-data 형식
const apiFormInstance = (): AxiosInstance => {
  const AxiosInst = axios.create({
    baseURL: URL,
    headers: {
      'Content-type': 'multipart/form-data',
    },
  });

  return AxiosInst;
};

export { apiInstance, apiFormInstance };
