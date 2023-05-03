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
  // 스튜디오
}

const HallOfFameBG = ({ imgPath }: HallOfFameBGProps) => {
  return (
    <div className="halloffame">
      <div className="halloffame__foreground-container">
        <CardTitle title="두부김치는 정말 맛있습니다" />
        <TextButton label="리얼로" />
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
