import { atom } from 'recoil';
import Article from 'types/Article';

export const ArticleState = atom<Article[]>({
  key: 'ArticleState',
  default: [],
});
