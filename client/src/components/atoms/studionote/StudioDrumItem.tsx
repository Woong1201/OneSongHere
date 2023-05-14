import React, { useState } from 'react';
import './StudioDrumItem.scss';

interface StudioDrumItemProps {
  timing: number;
  power?: 'strong' | 'weak';
  type?: 'kick' | 'snare';
  updateDrum?: (name: string, timing: number | undefined) => void;
  playDrum?: (beatPower: 'weak' | 'strong', drumType: 'kick' | 'snare') => void;
  selected: boolean;
}

const StudioDrumItem = ({
  timing,
  power = 'weak',
  type = 'kick',
  selected,
  updateDrum,
  playDrum,
}: // selected,
StudioDrumItemProps) => {
  const circleSize = power === 'strong' ? 'large' : 'small';
  const [isSelected, setIsSelected] = useState(selected);

  const selectDrum = () => {
    setIsSelected(!isSelected);
    if (updateDrum !== undefined && playDrum !== undefined) {
      playDrum(power, type);
      updateDrum(type, timing);
    }
    console.log(isSelected);
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
          isSelected ? 'studio__drum-item-circle--selected' : '',
        ].join(' ')}
      />
    </button>
  );
};

export default StudioDrumItem;
