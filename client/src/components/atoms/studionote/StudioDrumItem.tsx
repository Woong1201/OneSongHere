import React, { useState, useEffect } from 'react';
import './StudioDrumItem.scss';

interface StudioDrumItemProps {
  timing: number;
  power?: 'strong' | 'weak';
  type?: 'kick' | 'snare';
  updateDrum?: (name: string, timing: number | undefined) => void;
  playDrum?: (beatPower: 'weak' | 'strong', drumType: 'kick' | 'snare') => void;
  selected: boolean;
  disabled?: boolean;
}

const StudioDrumItem = ({
  timing,
  power = 'weak',
  type = 'kick',
  selected,
  updateDrum,
  playDrum,
  disabled = false,
}: // selected,
StudioDrumItemProps) => {
  const circleSize = power === 'strong' ? 'large' : 'small';
  const [isSelected, setIsSelected] = useState(selected);
  const disabledDrumStyle = disabled ? 'studio__drum-item--disabled' : '';
  const seletedCircle = isSelected ? 'studio__drum-item-circle--selected' : '';
  const selectDrum = () => {
    if (disabled) return;
    setIsSelected(!isSelected);
    if (updateDrum !== undefined && playDrum !== undefined) {
      playDrum(power, type);
      updateDrum(type, timing);
    }
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <button
      type="button"
      className={['studio__drum-item', disabledDrumStyle].join(' ')}
      onClick={selectDrum}
      aria-label="a"
    >
      <div
        className={[
          'studio__drum-item-circle',
          `studio__drum-item-circle--${circleSize}`,
          seletedCircle,
        ].join(' ')}
      />
    </button>
  );
};

export default StudioDrumItem;
