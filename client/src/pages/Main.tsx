import { Link } from 'react-router-dom';
import 'pages/Main';
import MainBanner from 'components/organisms/main/MainBanner';
import TransparencyText from '../components/atoms/transparencytext/TransparencyText';

const Main = () => {
  return (
    <div>
      <div className="main-page__banner">
        <MainBanner content={['나에게서 너로,', '우리만의 음악 작곡 플랫폼']} />
      </div>
      <TransparencyText
        gifUrl="https://i.gifer.com/UoLl.gif"
        transparencyText="시간과 공간 상관없이 
          이어지는 작곡의 열기"
      />
    </div>
  );
};

export default Main;
