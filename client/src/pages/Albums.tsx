import React, { useState, useEffect } from 'react';
// 컴포넌트 import
import SearchBar from 'components/molecules/searchsection/SearchBar';
import HallOfFameBG from 'components/atoms/halloffame/HallOfFameBG';
import SectionTitle from 'components/atoms/common/SectionTitle';
import AlbumCardsGrid from 'components/organisms/albums/albumcards/AlbumCardsGrid';
// SCSS import
import './Albums.scss';
// api import
import { searchAlbums } from 'services/album';

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

  useEffect(() => {
    setIsLoading(true);
    searchAlbums(
      'title',
      keyword,
      ({ data }) => {
        console.log(data);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      }
    );

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [keyword]);

  return (
    <div className="album__container">
      <div
        className="halloffame__container"
        style={{ width: `${width >= 992 ? '1000px' : '100%'}` }}
      >
        <SectionTitle title="명예의 전당" />
      </div>
      <HallOfFameBG
        imgPath="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2018%2F02%2F13%2Ffield-image-ham-slices-hero-2000.jpg&q=60"
        albumTitle="햄을 칼로 삭삭삭"
        albumStudio="정육점"
      />
      {/* 생성날짜가 이번 달이고, 하트 개수가 가장 많은 앨범 세 개를 골라서 캐러셀으로 출력(자동전환) */}
      <SearchBar
        onChangeSearchType={() => handleSearchType('TITLE')}
        onChangeKeyword={handleKeyword}
      />
      {isLoading ? <div>로딩 중입니다...</div> : <AlbumCardsGrid />}
    </div>
  );
};

export default Albums;
