import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { getLogin } from 'services/user';
import userState from 'store/userAtom';

const GoogleLogin = () => {
  const [user, setUser] = useRecoilState(userState);
  const navigate = useNavigate();

  const handleLogin = (code: string) => {
    getLogin(
      code,
      ({ data }) => {
        // setUser({
        //   userId: data.userID,
        //   nickname: data.nickName,
        //   picture: data.picture,
        //   accessToken: data.accessToken,
        // });
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
    console.log('user: ', user);
    navigate('/');
  }, [navigate]);
  return <div />;
};

export default GoogleLogin;
