import './Login.scss';
import LoginButton from 'components/atoms/buttons/LoginButton';
import google from 'assets/images/icon/google.svg';
import kakao from 'assets/images/icon/kakao.svg';
import naver from 'assets/images/icon/naver.svg';
import { handleGoogleLogin } from 'services/user';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import userProfileState from 'store/userAtom';

const Login = () => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const navigate = useNavigate();

  const handleLogin = () => {
    handleGoogleLogin(
      ({ data }) => {
        setUserProfile(data);
        console.log(userProfile);
        navigate('/main');
      },
      (error) => {
        console.log('로그인 에러', error);
      }
    );
  };

  return (
    <>
      <div className="login-page__title">
        <p>소셜 로그인으로 시작하기</p>
      </div>

      <div className="login-page__buttons">
        <LoginButton
          onClick={handleLogin}
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
