import React from 'react';
import './StudioTitle.scss';
import CardTitle from 'components/atoms/common/CardTitle';

interface StudioTitleProps {
  studioTitle: string;
}

const StudioTitle = ({ studioTitle }: StudioTitleProps) => {
  return (
    <div className="studio__header-title">
      <CardTitle title={studioTitle} color="white" />
    </div>
  );
};

export default StudioTitle;
