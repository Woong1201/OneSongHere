import React from 'react';
import './ProfileDropdown.scss';
import { useNavigate } from 'react-router-dom';
import ProfileDropdownItem from 'components/atoms/profiledropdown/ProfileDropdownItem';

interface Item {
  label: string;
  icon: React.ReactElement | string;
  route?: string;
  onClick?: () => void;
}
interface ProfileDropdownProps {
  isShowed?: boolean;
  items: Item[];
}
const ProfileDropdown = ({ isShowed = false, items }: ProfileDropdownProps) => {
  const navigate = useNavigate();

  const mode = isShowed
    ? 'header__dropdown--showed'
    : 'header__dropdown--hidden';

  const onClick = (item: Item) => {
    if (item.route) {
      return () => {
        navigate(item.route as string);
      };
    }
    if (item.onClick) {
      // 라우터가 아닌 클릭 이벤트
      return item.onClick;
    }
    return undefined;
  };

  return (
    <div className={[mode, 'profile__dropdown-list'].join(' ')}>
      {items.map((item) => (
        <ProfileDropdownItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          onClick={onClick(item)}
        />
      ))}
    </div>
  );
};

export default ProfileDropdown;
