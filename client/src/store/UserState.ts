import { atom } from 'recoil';
import User from 'types/User';

export const UserState = atom<User | null>({
  key: 'UserState',
  default: null,
});
