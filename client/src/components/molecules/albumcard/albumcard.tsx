import React from 'react';
import 'components/molecules/albumcard/albumcard.scss';
import CardTitle from 'components/atoms/common/CardTitle';
import Chip from 'components/atoms/common/Chip';
import LikeHeart from 'components/atoms/likeheart/LikeHeart';

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
      <div className="album-card-cover-box">
        <div className="album-card__cover-frame">
          <img
            src={imgPath}
            alt="작품 앨범 커버"
            className="album-card__cover-image"
          />
        </div>
      </div>
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
        <div>{albumInfo}</div>
      </div>
    </div>
  );
};

export default AlbumCard;
