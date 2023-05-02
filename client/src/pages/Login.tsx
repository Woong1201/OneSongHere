import './Login.scss';
import LoginButton from 'components/atoms/buttons/LoginButton';
import google from 'assets/images/icon/google.svg';
import kakao from 'assets/images/icon/kakao.svg';
import naver from 'assets/images/icon/naver.svg';

const Login = () => {
  return (
    <>
      <div className="login-page__title">
        <p>소셜 로그인으로 시작하기</p>
      </div>

      <div className="login-page__buttons">
        <LoginButton type="google" src={google} label="Google로 시작하기" />
        <LoginButton type="kakao" src={kakao} label="카카오톡으로 시작하기" />
        <LoginButton type="naver" src={naver} label="네이버로 시작하기" />
      </div>
    </>
  );
};

export default Login;
