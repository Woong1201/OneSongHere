import React from 'react';
import './StudioDrumItem.scss';

interface StudioDrumItemProps {
  power?: 'strong' | 'weak';
  playDrum?: (beatPower: 'weak' | 'strong') => void;
}

const StudioDrumItem = ({
  power = 'weak',
  playDrum = () => {
    console.log();
  },
}: StudioDrumItemProps) => {
  const circleSize = power === 'strong' ? 'large' : 'small';

  const selectDrum = () => {
    playDrum(power);
  };
  return (
    <button
      type="button"
      className={['studio__drum-item'].join(' ')}
      onClick={selectDrum}
      aria-label="a"
    >
      <div
        className={[
          'studio__drum-item-circle',
          `studio__drum-item-circle--${circleSize}`,
        ].join(' ')}
      />
    </button>
  );
};

export default StudioDrumItem;
