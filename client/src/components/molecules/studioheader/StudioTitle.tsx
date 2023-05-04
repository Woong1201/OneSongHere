import React from 'react';
import './StudioTitle.scss';
import CardTitle from 'components/atoms/common/CardTitle';

const StudioTitle = () => {
  return (
    <div className="studio__header-title">
      <CardTitle title="스튜디오 타이틀" color="white" />
    </div>
  );
};

export default StudioTitle;
