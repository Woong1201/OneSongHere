import { atom } from 'recoil';
import User from 'types/User';

const userState = atom<User>({
  key: 'userProfileState',
  default: {
    userId: 0,
    accessToken: '',
    nickname: '',
    picture: '',
  },
});

export default userState;
