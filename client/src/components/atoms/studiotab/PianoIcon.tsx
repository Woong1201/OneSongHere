import React from 'react';
import { ReactComponent as PianoSvg } from 'assets/images/icon/Piano.svg';
import { ReactComponent as PianoDisabledSvg } from 'assets/images/icon/PianoDisabled.svg';

interface PianoIconProps {
  disabled?: boolean;
}

const PianoIcon = ({ disabled = false }: PianoIconProps) => {
  return disabled ? <PianoDisabledSvg /> : <PianoSvg />;
};

export default PianoIcon;
