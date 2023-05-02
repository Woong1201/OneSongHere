import React from 'react';
import logo from 'assets/logo.svg';
import { Link } from 'react-router-dom';

interface LogoIconProps {
  goHome?: boolean;
}
const LogoIcon = ({ goHome = false }: LogoIconProps) => {
  if (goHome) {
    return (
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
    );
  }
  return (
    <div>
      <img src={logo} alt="" />
    </div>
  );
};

export default LogoIcon;
