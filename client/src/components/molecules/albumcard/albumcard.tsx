import React from 'react';
import 'components/molecules/albumcard/albumcard.scss';
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
  like,
  tag,
  albumInfo,
}: AlbumCardProps) => {
  return (
    <div className="album-card">
      {/* 사진 영역 */}
      <div className="album-card__cover-box">
        {/* <div className="album-card__cover-frame"> */}
        <AlbumImage imageUrl={imgPath} size="large" />
        {/* </div> */}
      </div>
      {/* 정보 영역 */}
      <div className="album-card__info-box">
        <div>
          <CardTitle title={albumTitle} maxWidth={400} />
        </div>
        <div className="album-card__info-studio-like">
          <div>{albumStudio}</div>
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
