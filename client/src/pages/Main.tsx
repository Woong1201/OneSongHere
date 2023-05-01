import { Link } from 'react-router-dom';
import TransparencyText from '../components/atoms/transparencytext/TransparencyText';

const Main = () => {
  return (
    <>
      <div>메인페이지</div>
      <div>구성 ㄱㄱ</div>
      <div>
        <TransparencyText
          gifUrl="https://i.gifer.com/UoLl.gif"
          transparencyText="시간과 공간 상관없이 
          이어지는 작곡의 열기"
        />
      </div>
      <Link to="/compose"> 작곡 페이지 </Link>
    </>
  );
};

export default Main;
