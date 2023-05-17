import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'components/organisms/common/Header.scss';
import User from 'types/User';
import TextButton from 'components/atoms/buttons/TextButton';
import Button from 'components/atoms/buttons/Button';
import ProfileImage from 'components/atoms/profile/ProfileImage';
// import Dropdown from 'components/molecules/header/Dropdown';
import ProfileDropdown from 'components/molecules/header/ProfileDropdown';
import ProfileIcon from 'components/atoms/profiledropdown/ProfileIcon';
import LogoutIcon from 'components/atoms/profiledropdown/LogoutIcon';
import { useRecoilState } from 'recoil';
import { LoginState } from 'store/LoginState';
import { UserState } from 'store/UserState';
import Logo from 'components/molecules/common/Logo';

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

  const [, setIsLoggedIn] = useRecoilState(LoginState);
  const [, setUser] = useRecoilState(UserState);

  const logoutHandler = () => {
    localStorage.removeItem('accessToken');
    setIsLoggedIn(false);
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // const headerDropdownList = [
  //   { label: '일반', route: '/compose' },
  //   { label: '릴레이', route: '/relay' },
  // ];

  const profileDropdownList = [
    { label: '내 프로필', icon: <ProfileIcon />, route: '' },
    { label: '로그아웃', icon: <LogoutIcon />, onClick: logoutHandler },
  ];

  return (
    <div className="header">
      <Logo goHome whiteMode={whiteMode} />
      <nav className="header__nav-list">
        <div className="header__nav-item">
          <TextButton label="작곡" white={whiteMode} to="/relay" />
          {/* <div className="header__dropdown">
            <Dropdown items={headerDropdownList} />
          </div> */}
        </div>
        <TextButton label="작품" white={whiteMode} to="/albums" />
        <TextButton label="커뮤니티" white={whiteMode} to="/board" />
        <TextButton label="소개" white={whiteMode} to="/docs" />
      </nav>
      <div>
        {user ? (
          <div className="header__profile-item">
            <ProfileImage imageUrl={user.picture} size="small" />
            <div className="header__profile-dropdown">
              <ProfileDropdown items={profileDropdownList} />
            </div>
          </div>
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
