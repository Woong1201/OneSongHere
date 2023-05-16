import React, { useState, useEffect } from 'react';
// 컴포넌트 import
import AlbumCard from 'components/molecules/albumcard/AlbumCard';
// api 모듈 import
import { getAlbums } from 'services/album';
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

  // useState에 제네릭으로 number만 넣을 수 있도록 타입을 제한함
  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 작품들 데이터 가져오는 api용 list 초기화
  // const [albumlist, getAlbumList] = useState<Album[]>([]);
  // const getAlbumData = () => {
  //   setIsLoading(true);
  //   getAlbums(
  //     ({ data }) => {
  //       console.log(data);
  //       getAlbumList(data);
  //       setIsLoading(false);
  //     },
  //     (error) => {
  //       console.log(error);
  //       setIsLoading(false);
  //     }
  //   );
  // };
  // useEffect(() => {
  //   getAlbumData();
  // }, []);

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
          {AlbumCards.map((album) => (
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
