import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLogin } from 'services/user';

const GoogleLogin = () => {
  const navigate = useNavigate();

  const handleLogin = (code: string) => {
    getLogin(
      code,
      ({ data }) => {
        console.log(window.location.href);
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

    console.log(code);
    handleLogin(code);
    navigate('/');
  }, [navigate]);
  return <div />;
};

export default GoogleLogin;
