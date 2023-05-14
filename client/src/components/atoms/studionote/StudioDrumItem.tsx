import React from 'react';
import './StudioDrumItem.scss';

interface StudioDrumItemProps {
  size?: 'small' | 'large';
}

const StudioDrumItem = ({ size = 'small' }: StudioDrumItemProps) => {
  return (
    <button
      type="button"
      className={['studio__drum-item'].join(' ')}
      //   onClick={}
      aria-label="a"
    >
      <div
        className={[
          'studio__drum-item-circle',
          `studio__drum-item-circle--${size}`,
        ].join(' ')}
      />
    </button>
  );
};

export default StudioDrumItem;
