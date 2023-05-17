import React from 'react';
import './ProfileDropdownItem.scss';

interface ProfileDropdownItemProps {
  label: string;
  icon: React.ReactElement | string;
  onClick?: () => void;
}

const ProfileDropdownItem = ({
  label,
  icon,
  onClick,
}: ProfileDropdownItemProps) => {
  return (
    <button type="button" className="profile-dropdown__item" onClick={onClick}>
      {icon}
      {label}
    </button>
  );
};

export default ProfileDropdownItem;
