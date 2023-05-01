import 'components/molecules/header/Dropdown.scss';
import React from 'react';
import DropdownItem from 'components/atoms/dropdown/DropdownItem';

interface DropdownProps {
  isShowed?: boolean;
}
const Dropdown = ({ isShowed = false }: DropdownProps) => {
  const mode = isShowed
    ? 'header__dropdown--showed'
    : 'header__dropdown--hidden';

  return (
    <div className={[mode, 'header__dropdown'].join(' ')}>
      <div className="header__dropdown-list">
        <DropdownItem label="일반" />
        <DropdownItem label="릴레이" />
      </div>
    </div>
  );
};

export default Dropdown;
