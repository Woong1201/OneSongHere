import React from 'react';
import './AlbumImage.scss';

interface AlbumImageProps {
  /**
   * 이미지 URL을 넣어주세요
   */
  imageUrl: string;
  /**
   * 이미지 크기
   */
  size?: 'small' | 'medium';
}

const AlbumImage = ({ imageUrl, size = 'medium' }: AlbumImageProps) => {
  return (
    <div
      className={[
        'album-image__container',
        `album-image__container-${size}`,
      ].join(' ')}
    >
      <img src={imageUrl} alt="" className="album-image__img" />
    </div>
  );
};

export default AlbumImage;
