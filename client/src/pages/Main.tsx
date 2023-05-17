import { Link } from 'react-router-dom';
import 'pages/Main.scss';
import MainBanner from 'components/organisms/main/MainBanner';
import GifBox from 'components/atoms/gifbox/GifBox';
import ExampleCard from 'components/atoms/examplecard/ExampleCard';
// gif import
import gifFirst from 'assets/images/gif_1.gif';
import gifSecond from 'assets/images/gif_2.gif';
import gifThird from 'assets/images/gif_3.gif';
import exampleImage from 'assets/images/compose_example1.png';
import TransparencyText from '../components/atoms/transparencytext/TransparencyText';

const exampleText = ['간단한 조작으로', '멋진 음악을 만들 수 있습니다.'];

const gifList = [
  {
    idx: 1,
    text: ['복잡한 과정 없이', '간단하게 작곡을 체험해 보고 싶다면'],
    path: gifFirst,
    color: '#18DE69',
  },
  {
    idx: 2,
    text: ['다른 사람과 릴레이로', '음악을 만들 수 있다'],
    path: gifSecond,
    color: '#E9EDEE',
  },
  {
    idx: 3,
    text: ['직접 연주한 음악을', 'MP3 파일로 저장하는 것도 가능!'],
    path: gifThird,
    color: '#5C55B4',
  },
];

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
      <ExampleCard
        imgPath={exampleImage}
        header={exampleText}
        content="다른 사람이 만든 음악에 참여하여 멜로디를 이어가보세요"
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '50px',
        }}
      >
        <div className="main-page__gif-container">
          {gifList.map((info) => (
            <div key={info.idx}>
              <GifBox
                texts={info.text}
                gifPath={info.path}
                color={info.color}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
