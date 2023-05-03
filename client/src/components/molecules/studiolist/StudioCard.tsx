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
  tag: string;
}

const StudioCard = ({
  recordColor = Color.Purple,
  studioTitle,
  startDate,
  endDate,
  tag = '태그',
}: StudioCardProps) => {
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
        <div className="studio-card__tag">
          <Chip label={tag} size="small" />
        </div>
      </div>
    </div>
  );
};

export default StudioCard;
