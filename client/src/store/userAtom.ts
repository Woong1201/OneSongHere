import { atom } from 'recoil';

const userProfileState = atom({
  key: 'userProfileState',
  default: null,
});

export default userProfileState;
