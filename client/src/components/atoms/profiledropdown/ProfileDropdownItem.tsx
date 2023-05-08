import React from 'react';
import './ProfileDropdownItem.scss';

interface ProfileDropdownItemProps {
  label: string;
  onClick?: () => void;
}

const ProfileDropdownItem = ({ label, onClick }: ProfileDropdownItemProps) => {
  return (
    <button type="button" className="profile-dropdown__item" onClick={onClick}>
      {label}
    </button>
  );
};

export default ProfileDropdownItem;
