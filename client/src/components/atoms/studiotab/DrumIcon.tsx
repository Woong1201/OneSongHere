import React from 'react';
import { ReactComponent as DrumSvg } from 'assets/images/icon/Drum.svg';
import { ReactComponent as DrumDisabledSvg } from 'assets/images/icon/DrumDisabled.svg';

interface DrumIconProps {
  disabled?: boolean;
}

const DrumIcon = ({ disabled = false }: DrumIconProps) => {
  return disabled ? <DrumDisabledSvg /> : <DrumSvg />;
};

export default DrumIcon;
