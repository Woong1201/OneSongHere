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
  const [isLoading, setIsLoading] = useState(false);
  // 작품들 데이터 가져오는 api용 list 초기화
  const [albumlist, getAlbumList] = useState<Album[]>([]);
  const [fameList, getFameList] = useState<Album[]>([]);

  const getAlbumData = () => {
    setIsLoading(true);
    getAlbums(
      ({ data }) => {
        console.log('data :', data);
        getAlbumList(data);
        console.log('원본', albumlist);
        getFameList(albumlist.sort((a, b) => a.likes - b.likes).slice(0, 3));
        console.log('fameList : ', fameList);
        console.log('정렬', albumlist);
        setIsLoading(false);
      },
      (error) => {
        console.log(error);
        setIsLoading(false);
      }
    );
  };
  useEffect(() => {
    getAlbumData();
  }, []);

  return (
    <div className="halloffame">
      <div className="halloffame__foreground-container">
        {fameList.map((album) => (
          <div>{album.nickName}</div>
        ))}
        {/* <div className="halloffame__foreground-info">
          <CardTitle title={albumTitle} />
          <TextButton label={albumStudio} />
        </div> */}
        {/* <div className="halloffame__foreground-cover">
          <AlbumImage imageUrl={imgPath} />
        </div> */}
      </div>
      <div className="halloffame__background-blur" />
      <img
        src={imgPath}
        alt="배경 이미지가 없습니다"
        className="halloffame__background"
      />
    </div>
  );
};

export default HallOfFameBG;
