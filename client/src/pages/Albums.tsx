import React, { useState, useEffect } from 'react';
// 컴포넌트 import
import SearchBar from 'components/molecules/searchsection/SearchBar';
import HallOfFameBG from 'components/atoms/halloffame/HallOfFameBG';
import SectionTitle from 'components/atoms/common/SectionTitle';
import AlbumCardsGrid from 'components/organisms/albums/albumcards/AlbumCardsGrid';
// SCSS import
import './Albums.scss';
// axios return 값 타입 정의 import
import Album from 'types/Album';
// api import
import { getAlbums, searchAlbums } from 'services/album';
// spinner import
import { Audio } from 'react-loader-spinner';

const Albums = () => {
  // 반응형용 useState : useState에 제네릭으로 number만 넣을 수 있도록 타입을 제한함
  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  // 로딩 여부 관리
  const [isLoading, setIsLoading] = useState(false);

  // SearchBar용 useState
  const [searchType, setSearchType] = useState<string>('');
  const [keyword, setKeyword] = useState<string>('');
  const handleSearchType = (type: string) => {
    setSearchType(type);
  };
  const handleKeyword = (word: string) => {
    setKeyword(word);
  };

  // 작품들 데이터 가져오는 api용 list 초기화
  const [albumlist, getAlbumList] = useState<Album[]>([]);
  useEffect(() => {
    setIsLoading(true);
    if (keyword === '') {
      getAlbums(
        ({ data }) => {
          getAlbumList(data);
          setIsLoading(false);
        },
        (error) => {
          console.log('엘범 가져오기 에러:', error);
          setIsLoading(false);
        }
      );
    } else {
      searchAlbums(
        'title',
        keyword,
        ({ data }) => {
          getAlbumList(data);
          setIsLoading(false);
        },
        (error) => {
          console.log('앨범 검색 에러', error);
          setIsLoading(false);
        }
      );
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [keyword]);

  const [scrollNumber, setScrollNumber] = useState(0);
  const handleScroll = () => {
    setScrollNumber(window.innerHeight + window.scrollY);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="album__container">
      <div
        className="halloffame__container"
        style={{ width: `${width >= 992 ? '1000px' : '100%'}` }}
      >
        <SectionTitle title="명예의 전당" />
      </div>
      <HallOfFameBG
        imgPath="https://media.istockphoto.com/id/1190645702/photo/mans-hand-playing-acoustic-guitar.jpg?s=612x612&w=0&k=20&c=3I-q9DDi-U9Yup0iFEfRjMVzpicM-NHH2xSlxg_W870="
        albumTitle=""
        albumStudio=""
      />
      {/* 생성날짜가 이번 달이고, 하트 개수가 가장 많은 앨범 세 개를 골라서 캐러셀으로 출력(자동전환) */}
      <SearchBar
        onChangeSearchType={() => handleSearchType('TITLE')}
        onChangeKeyword={handleKeyword}
      />
      {scrollNumber > 1077 ? (
        <button
          type="button"
          className="launch__button"
          onClick={goToTop}
          style={{ cursor: 'pointer' }}
        >
          ▲
        </button>
      ) : null}
      {isLoading ? (
        <div>
          <Audio
            height="120"
            width="120"
            color="#4642FF"
            ariaLabel="audio-loading"
            wrapperStyle={{}}
            wrapperClass="wrapper-class"
            visible
          />
          <br />
          로딩 중입니다...
        </div>
      ) : (
        <AlbumCardsGrid AlbumCards={albumlist} />
      )}
    </div>
  );
};

export default Albums;
