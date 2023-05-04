import 'components/molecules/header/Dropdown.scss';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DropdownItem from 'components/atoms/dropdown/DropdownItem';

interface Item {
  label: string;
  route?: string;
  onClick?: () => void;
}
interface DropdownProps {
  isShowed?: boolean;
  items: Item[];
}
const Dropdown = ({ isShowed = false, items }: DropdownProps) => {
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
      return item.onClick;
    }
    return undefined;
  };

  return (
    <div className={[mode, 'header__dropdown-list'].join(' ')}>
      {items.map((item) => (
        <DropdownItem
          key={item.label}
          label={item.label}
          onClick={onClick(item)}
        />
      ))}
    </div>
  );
};

export default Dropdown;
