import React from 'react';
import 'components/atoms/halloffame/HallOfFameBG.scss';
// atom import
import AlbumImage from 'components/atoms/albumimage/AlbumImage';

interface HallOfFameBGProps {
  // 작품 앨범 커버
  imgPath: string;
}

const HallOfFameBG = ({ imgPath }: HallOfFameBGProps) => {
  return (
    <div>
      <AlbumImage imageUrl={imgPath} size="fame" />
    </div>
  );
};

export default HallOfFameBG;
