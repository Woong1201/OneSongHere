import './Login.scss';
import LoginButton from 'components/atoms/buttons/LoginButton';
import google from 'assets/images/icon/google.svg';
import kakao from 'assets/images/icon/kakao.svg';
import naver from 'assets/images/icon/naver.svg';

const Login = () => {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  console.log(clientId);
  const url = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&response_type=code&redirect_uri=http://localhost:3000/login/google&client_id=${clientId}`;

  const getCustomUrl = () => {
    window.location.assign(url);
  };

  return (
    <>
      <div className="login-page__title">
        <p>소셜 로그인으로 시작하기</p>
      </div>

      <div className="login-page__buttons">
        <LoginButton
          onClick={getCustomUrl}
          type="google"
          src={google}
          label="Google로 시작하기"
        />
        <LoginButton type="kakao" src={kakao} label="카카오톡으로 시작하기" />
        <LoginButton type="naver" src={naver} label="네이버로 시작하기" />
      </div>
    </>
  );
};

export default Login;
