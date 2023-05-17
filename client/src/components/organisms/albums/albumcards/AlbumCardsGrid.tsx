import React, { useState, useEffect } from 'react';
// 컴포넌트 import
import AlbumCard from 'components/molecules/albumcard/AlbumCard';
// axios return 값 타입 정의 import
import Album from 'types/Album';
// grid import
import { Container, Row, Col } from 'react-grid-system';
// SCSS import
import './AlbumCardsGrid.scss';

interface AlbumCardsGridProps {
  AlbumCards: Album[];
}

const AlbumCardsGrid = ({ AlbumCards }: AlbumCardsGridProps) => {
  // 로딩 여부 관리
  // const [isLoading, setIsLoading] = useState(false);

  // 무한 스크롤用 변수들 관리
  const [visibleData, setVisibleData] = useState<Album[]>([]);
  const [page, setPage] = useState(1);

  // useState에 제네릭으로 number만 넣을 수 있도록 타입을 제한함
  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  // 반응형 useEffect
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // AlbumCards가 값이 변했을 때, 즉 값이 들어왔을 때 카드 리스트 4개까지 받기
  useEffect(() => {
    setVisibleData(AlbumCards.slice(0, 4));
  }, [AlbumCards]);

  // 스크롤이 아래로 갔고 && 보여줄 데이터의 길이가 전체 데이터 길이보다 짧다면
  // 보여줄 데이터의 길이를 추가
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      visibleData.length < AlbumCards.length
    ) {
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * 4;
      const endIndex = startIndex + 4;
      const newVisibleItems = AlbumCards.slice(startIndex, endIndex);
      setPage(nextPage);
      setVisibleData((prevData) => [...prevData, ...newVisibleItems]);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleData, page, AlbumCards]);

  // ========================================================================
  // ===============================(  렌 더 링  )============================
  // ========================================================================
  return (
    <div
      className="cards__container"
      style={{ width: `${width >= 1200 ? '1000px' : '100%'}` }}
    >
      <Container>
        <Row
          style={{
            width: `${width >= 992 ? '100%' : '500px'}`,
          }}
        >
          {visibleData.map((album) => (
            <Col sm={12} md={12} lg={6} key={album.albumId}>
              <AlbumCard
                imgPath={album.albumUrl}
                albumTitle={album.albumTitle}
                albumStudio={album.nickName}
                mp3Url={album.mp3Url}
                like={album.userLike}
                tags={album.tags}
                albumInfo={album.albumContent}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AlbumCardsGrid;
