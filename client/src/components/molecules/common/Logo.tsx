import LogoIcon from 'components/atoms/common/LogoIcon';
import LogoText from 'components/atoms/common/LogoText';
import React from 'react';
import './Logo.scss';

interface LogoProps {
  goHome?: boolean;
  whiteMode?: boolean;
}

const Logo = ({ goHome = false, whiteMode = false }: LogoProps) => {
  const logoTextColor = whiteMode ? 'white' : 'black';
  return (
    <div className="logo">
      <LogoIcon goHome whiteMode={whiteMode} size="small" />
      <LogoText goHome color={logoTextColor} width={140} />
    </div>
  );
};

export default Logo;
