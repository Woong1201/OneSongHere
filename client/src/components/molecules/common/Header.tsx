import React from 'react';
// import { useNavigate } from 'react-router-dom';
import 'components/molecules/common/Header.scss';
import LogoIcon from 'components/atoms/common/LogoIcon';
import TextButton from 'components/atoms/buttons/TextButton';
import { Button } from 'components/atoms/buttons/Button';
import User from 'types/User';
import ProfileImage from 'components/atoms/profile/ProfileImage';
import Dropdown from '../header/Dropdown';

interface HeaderProps {
  user?: User;
  onLoginClick: () => void;
}

const Header = ({ user, onLoginClick }: HeaderProps) => {
  return (
    <div className="header">
      <LogoIcon />
      <nav className="header__nav-list">
        <div className="header__nav-item">
          <TextButton label="작곡" />
          <Dropdown />
        </div>
        <TextButton label="커뮤니티" />
        <TextButton label="작품" />
      </nav>
      <div>
        {user ? (
          <ProfileImage imageUrl={user.picture} size="small" />
        ) : (
          <Button label="로그인" color="primary" onClick={onLoginClick} />
        )}
      </div>
    </div>
  );
};

export default Header;
