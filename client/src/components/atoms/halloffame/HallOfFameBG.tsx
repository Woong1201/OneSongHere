import React from 'react';
import 'components/atoms/halloffame/HallOfFameBG.scss';
// atom import
import AlbumImage from 'components/atoms/albumimage/AlbumImage';
import CardTitle from 'components/atoms/common/CardTitle';
import TextButton from 'components/atoms/buttons/TextButton';

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
  return (
    <div className="halloffame">
      <div className="halloffame__foreground-container">
        <CardTitle title={albumTitle} />
        <TextButton label={albumStudio} />
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
