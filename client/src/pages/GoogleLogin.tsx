import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getLogin } from 'services/user';
import { LoginState } from 'store/LoginState';
import { UserState } from 'store/UserState';
import User from 'types/User';

const GoogleLogin = () => {
  const [, setIsLoggedIn] = useRecoilState(LoginState);
  const [, setUser] = useRecoilState(UserState);
  const navigate = useNavigate();

  const handleLogin = (code: string) => {
    getLogin(
      code,
      ({ data }) => {
        const { accessToken } = data;
        const { userID } = data;
        const { nickName } = data;
        const { picture } = data;

        const user: User = {
          userId: userID,
          nickname: nickName,
          picture,
        };

        if (accessToken) localStorage.setItem('accessToken', accessToken);
        if (localStorage.getItem('accessToken')) {
          setIsLoggedIn(true);
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
        }
      },
      (error) => {
        console.log('로그인 에러', error);
      }
    );
  };
  useEffect(() => {
    const url = new URL(window.location.href);
    const searchParams = new URLSearchParams(url.search);
    const code = searchParams.get('code');

    if (!code) return;

    handleLogin(code);
    navigate('/');
  }, [navigate]);
  return <div />;
};

export default GoogleLogin;
