import React, { SyntheticEvent } from 'react';
import './AlbumImage.scss';
import altImage from 'assets/images/main_page_banner.png';

interface AlbumImageProps {
  /**
   * 이미지 URL을 넣어주세요
   */
  imageUrl: string;
  /**
   * 이미지 크기
   */
  size?: 'small' | 'medium' | 'large';
}

const AlbumImage = ({ imageUrl, size = 'medium' }: AlbumImageProps) => {
  const HandleUnloadedImage = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = altImage;
  };

  return (
    <div
      className={[
        'album-image__container',
        `album-image__container-${size}`,
      ].join(' ')}
    >
      <img
        src={imageUrl}
        alt="이미지 없음"
        onError={HandleUnloadedImage}
        className="album-image__img"
      />
    </div>
  );
};

export default AlbumImage;
