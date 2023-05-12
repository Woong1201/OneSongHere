import React, { useState, useEffect } from 'react';
// scss import
import './AlbumCard.scss';
// atom import
import CardTitle from 'components/atoms/common/CardTitle';
import Chip from 'components/atoms/common/Chip';
import LikeHeart from 'components/atoms/likeheart/LikeHeart';
import AlbumImage from 'components/atoms/albumimage/AlbumImage';

interface AlbumCardProps {
  //   작품 앨범 커버
  imgPath: string;
  //   작품 앨범 타이틀
  albumTitle: string;
  //   작업 스튜디오 이름
  albumStudio: string;
  // 곡 url or 노트 오브젝트
  mp3Url: string;
  //   좋아요 클릭 여부
  like: boolean;
  //   태그 장르명
  tag: string;
  //   작품 앨범 정보
  albumInfo: string;
}

const AlbumCard = ({
  imgPath,
  albumTitle,
  albumStudio,
  mp3Url,
  like,
  tag,
  albumInfo,
}: AlbumCardProps) => {
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

  console.log(mp3Url);

  return (
    <div
      className="album-card"
      style={{ width: `${width >= 768 ? '440px' : '440px'}` }}
    >
      {/* 사진 영역 */}
      <div className="album-card__cover-box">
        {/* <div className="album-card__cover-frame"> */}
        <AlbumImage imageUrl={imgPath} size="large" />
        {/* </div> */}
      </div>
      {/* 정보 영역 */}
      <div className="album-card__info-box">
        <div>
          <CardTitle title={albumTitle} maxWidth={180} />
        </div>
        <div className="album-card__info-studio-like">
          <div className="album-card__info-studio">{albumStudio}</div>
          <LikeHeart isPushed={like} />
        </div>
        <div>
          <Chip label={tag} size="small" />
        </div>
        <div className="album-card__info-album-info">{albumInfo}</div>
      </div>
    </div>
  );
};

export default AlbumCard;
