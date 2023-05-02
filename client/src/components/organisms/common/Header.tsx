import React from 'react';
// import { useNavigate } from 'react-router-dom';
import 'components/organisms/common/Header.scss';
import User from 'types/User';
import LogoIcon from 'components/atoms/common/LogoIcon';
import TextButton from 'components/atoms/buttons/TextButton';
import { Button } from 'components/atoms/buttons/Button';
import ProfileImage from 'components/atoms/profile/ProfileImage';
import Dropdown from 'components/molecules/header/Dropdown';

interface HeaderProps {
  user?: User;
  whiteMode?: boolean;
  onLoginClick?: () => void;
}

const Header = ({ user, whiteMode = false, onLoginClick }: HeaderProps) => {
  const buttonColor = whiteMode ? 'main' : 'primary';

  return (
    <div className="header">
      <LogoIcon />
      <nav className="header__nav-list">
        <div className="header__nav-item">
          <TextButton label="작곡" white={whiteMode} />
          <Dropdown />
        </div>
        <TextButton label="커뮤니티" white={whiteMode} />
        <TextButton label="작품" white={whiteMode} />
      </nav>
      <div>
        {user ? (
          <ProfileImage imageUrl={user.picture} size="small" />
        ) : (
          <Button label="로그인" color={buttonColor} onClick={onLoginClick} />
        )}
      </div>
    </div>
  );
};

export default Header;
