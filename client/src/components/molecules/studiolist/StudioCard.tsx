import React from 'react';
import 'components/molecules/studiolist/StudioCard.scss';
import Color from 'types/Color';
import RecordImage from 'components/atoms/studiocard/RecordImage';
import CardTitle from 'components/atoms/common/CardTitle';
import CardDate from 'components/atoms/studiocard/StudioCardDate';
import Chip from 'components/atoms/common/Chip';

interface StudioCardProps {
  /**
   * 레코드판 색깔
   */
  recordColor?: Color;
  /**
   * 스튜디오 제목
   */
  studioTitle: string;
  /**
   * 시작 날짜
   */
  startDate: Date;
  /**
   * 끝나는 날짜
   */
  endDate: Date;
  /**
   * 태그에 들어갈 장르명
   */
  // 태그가 여러개일 경우 추가
  tags: string | string[];
}

const StudioCard = ({
  recordColor = Color.Purple,
  studioTitle,
  startDate,
  endDate,
  tags = '태그',
}: StudioCardProps) => {
  // 태그의 타입에 따라 렌더링
  const renderTags = () => {
    if (Array.isArray(tags)) {
      return tags.map((item) => <Chip key={item} label={item} size="small" />);
    }
    return <Chip label={tags} size="small" />;
  };
  return (
    <div className="studio-card">
      <div className="studio-card__record-image">
        <RecordImage color={recordColor} />
      </div>
      <div className="studio-card__info">
        <div className="studio-card__title">
          <CardTitle title={studioTitle} maxWidth={180} />
        </div>
        <div className="studio-card__date">
          <CardDate startDate={startDate} endDate={endDate} />
        </div>
        <div className="studio-card__tag">{renderTags()}</div>
      </div>
    </div>
  );
};

export default StudioCard;
