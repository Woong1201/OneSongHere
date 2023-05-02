import 'components/molecules/header/Dropdown.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownItem from 'components/atoms/dropdown/DropdownItem';

interface DropdownProps {
  isShowed?: boolean;
}
const Dropdown = ({ isShowed = false }: DropdownProps) => {
  const navigate = useNavigate();

  const mode = isShowed
    ? 'header__dropdown--showed'
    : 'header__dropdown--hidden';

  const navigatePage = (route: string) => {
    return () => {
      navigate(route);
    };
  };

  return (
    <div className={[mode, 'header__dropdown'].join(' ')}>
      <div className="header__dropdown-list">
        <DropdownItem label="일반" onClick={navigatePage('/compose')} />
        <DropdownItem label="릴레이" onClick={navigatePage('/relay')} />
      </div>
    </div>
  );
};

export default Dropdown;
