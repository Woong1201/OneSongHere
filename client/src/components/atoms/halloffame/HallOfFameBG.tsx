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
    <div className="halloffame">
      <div className="halloffame__foreground-container">
        <div className="halloffame__foreground-cover">
          <AlbumImage imageUrl={imgPath} />
        </div>
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
