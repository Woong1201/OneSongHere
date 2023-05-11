import { atom } from 'recoil';

export const ArticleState = atom<[]>({
  key: 'ArticleState',
  default: [],
});
