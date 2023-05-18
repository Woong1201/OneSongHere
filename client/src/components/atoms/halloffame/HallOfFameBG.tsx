import React, { useState, useEffect } from 'react';
import 'components/atoms/halloffame/HallOfFameBG.scss';
// atom import
import AlbumImage from 'components/atoms/albumimage/AlbumImage';
import CardTitle from 'components/atoms/common/CardTitle';
import TextButton from 'components/atoms/buttons/TextButton';

// api 모듈 import
import { getAlbums } from 'services/album';
// axios return 값 타입 정의 import
import Album from 'types/Album';

interface HallOfFameBGProps {
  // 작품 앨범 커버
  imgPath: string;
  // 작품 앨범 제목
  albumTitle: string;
  // 스튜디오
  albumStudio: string;
}

const HallOfFameBG = ({
  imgPath,
  albumTitle,
  albumStudio,
}: HallOfFameBGProps) => {
  // 로딩 여부 관리
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 좋아요 상위 3개 lst 초기화
  const [itemList, getItemList] = useState<Album[]>([]);
  const [fameList, getFameList] = useState<Album[]>([]);

  const getAlbumData = () => {
    setIsLoading(true);
    getAlbums(
      ({ data }) => {
        getItemList(data);
        setIsLoading(false);
      },
      (error) => {
        console.log('앨범 가져오기 에러:', error);
        setIsLoading(false);
      }
    );
  };

  useEffect(() => {
    getAlbumData();
  }, []);
  // 받아온 데이터를 likes를 기준으로 내림차순으로 정렬한 뒤 상위 3개 추출
  useEffect(() => {
    if (itemList.length > 0) {
      const sortedList = [...itemList]
        .sort((a: Album, b: Album) => b.likes - a.likes)
        .slice(0, 3);
      getFameList(sortedList);
    }
  }, [itemList]);

  // 자동 슬라이드를 위한 상태와 설정
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % fameList.length);
    }, 10000);

    return () => {
      clearInterval(intervalId);
    };
  }, [fameList]);

  const selectSlide = (num: number) => {
    setCurrentSlide(num);
  };

  const carouselList = [
    { id: 0, num: 0 },
    { id: 1, num: 1 },
    { id: 2, num: 2 },
  ];

  return (
    <div style={{ width: '100%' }}>
      <div className="halloffame">
        <div className="halloffame__foreground-container">
          {fameList.map((fAlbum, index) => (
            <div
              className={`halloffame__slide--${
                index === currentSlide ? 'active' : 'inactive'
              }`}
            >
              <AlbumImage imageUrl={fAlbum.albumUrl} size="large" />
              <div
                style={{
                  marginLeft: '40px',
                  marginTop: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'start',
                  color: 'white',
                  textShadow: '1px 1px 1px #000',
                }}
              >
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: '600',
                    marginBottom: '8px',
                  }}
                >
                  {fAlbum.albumTitle}
                </div>
                <div
                  style={{
                    marginTop: '5px',
                    fontSize: '18px',
                    color: '#EFEFEF',
                  }}
                >
                  {fAlbum.nickName}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="halloffame__background-blur" />
        <img
          src={imgPath}
          alt="배경 이미지가 없습니다"
          className="halloffame__background"
        />
      </div>
      {carouselList.map((carButton) => (
        <button
          key={carButton.id}
          type="button"
          onClick={() => selectSlide(carButton.num)}
          className={`carouselClick${
            currentSlide === carButton.num ? '' : '--not'
          }`}
        >
          &nbsp;
        </button>
      ))}
    </div>
  );
};

export default HallOfFameBG;
