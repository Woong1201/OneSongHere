import React, { useState, useEffect, useCallback, useRef } from 'react';
// scss import
import './AlbumCard.scss';
// atom import
import CardTitle from 'components/atoms/common/CardTitle';
import Chip from 'components/atoms/common/Chip';
import LikeHeart from 'components/atoms/likeheart/LikeHeart';
import AlbumImage from 'components/atoms/albumimage/AlbumImage';
import AlbumPlayButton from 'components/atoms/albumimage/AlbumPlayButton';

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
  tags: string[];
  //   작품 앨범 정보
  albumInfo: string;
  playAlbumMusic?: () => Promise<void>;
  stopAlbumMusic?: () => void;
  isPlaying?: boolean;
}

const AlbumCard = ({
  imgPath,
  albumTitle,
  albumStudio,
  mp3Url,
  like,
  tags,
  albumInfo,
  playAlbumMusic,
  stopAlbumMusic,
  isPlaying = false,
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

  const renderTags = () => {
    if (Array.isArray(tags)) {
      return tags.map((item) => <Chip key={item} label={item} size="small" />);
    }
    return <Chip label={tags} size="small" />;
  };

  const onClick = () => {
    if (playAlbumMusic && !isPlaying) {
      playAlbumMusic();
    } else if (stopAlbumMusic) {
      stopAlbumMusic();
    }
  };
  return (
    <div
      className="album-card"
      style={{ width: `${width >= 768 ? '440px' : '440px'}` }}
    >
      {/* 사진 영역 */}
      <div className="album-card__cover-box">
        {/* <div className="album-card__cover-frame"> */}
        <AlbumImage imageUrl={imgPath} size="medium" />
        {/* </div> */}
        <AlbumPlayButton isPlaying={isPlaying} onClick={onClick} />
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
        <div>{renderTags()}</div>
        <div className="album-card__info-album-info">{albumInfo}</div>
      </div>
    </div>
  );
};

export default AlbumCard;
