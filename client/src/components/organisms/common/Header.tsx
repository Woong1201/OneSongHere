import React from 'react';
// import { useNavigate } from 'react-router-dom';
import 'components/organisms/common/Header.scss';
import User from 'types/User';
import LogoIcon from 'components/atoms/common/LogoIcon';
import TextButton from 'components/atoms/buttons/TextButton';
import { Button } from 'components/atoms/buttons/Button';
import ProfileImage from 'components/atoms/profile/ProfileImage';
import Dropdown from 'components/molecules/header/Dropdown';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  user?: User;
  whiteMode?: boolean;
  onLoginClick?: () => void;
}

const Header = ({ user, whiteMode = false, onLoginClick }: HeaderProps) => {
  const buttonColor = whiteMode ? 'main' : 'primary';

  const navigate = useNavigate();
  const navigateLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className="header">
      <LogoIcon goHome />
      <nav className="header__nav-list">
        <div className="header__nav-item">
          <TextButton label="작곡" white={whiteMode} />
          <Dropdown />
        </div>
        <TextButton label="커뮤니티" white={whiteMode} to="/board" />
        <TextButton label="작품" white={whiteMode} to="/albums" />
      </nav>
      <div>
        {user ? (
          <ProfileImage imageUrl={user.picture} size="small" />
        ) : (
          <Button
            type="button"
            label="로그인"
            color={buttonColor}
            onClick={navigateLoginPage}
          />
        )}
      </div>
    </div>
  );
};

export default Header;
