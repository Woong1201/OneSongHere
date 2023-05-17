import React from 'react';
import { ReactComponent as GuitarSvg } from 'assets/images/icon/Guitar.svg';
import { ReactComponent as GuitarDisabledSvg } from 'assets/images/icon/GuitarDisabled.svg';

interface GuitarIconProps {
  disabled?: boolean;
}

const GuitarIcon = ({ disabled = false }: GuitarIconProps) => {
  return disabled ? <GuitarDisabledSvg /> : <GuitarSvg />;
};

export default GuitarIcon;
