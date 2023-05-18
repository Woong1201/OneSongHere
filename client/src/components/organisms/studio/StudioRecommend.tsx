import React from 'react';
import './StudioRecommend.scss';
import Button from 'components/atoms/buttons/Button';

const StudioRecommend = () => {
  return (
    <div className="studio__recommend">
      <Button label="추천받기" type="button" color="primary" />
    </div>
  );
};

export default StudioRecommend;
