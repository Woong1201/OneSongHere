import { atom } from 'recoil';
import Comment from 'types/Comment';

export const CommentState = atom<Comment[]>({
  key: 'CommentState',
  default: [],
});
