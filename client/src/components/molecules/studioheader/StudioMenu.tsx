import React from 'react';
import './StudioMenu.scss';
import HamburgerIcon from 'components/atoms/common/HamburgerIcon';
import Dropdown from 'components/molecules/header/Dropdown';

interface StudioMenuProps {
  saveNotes: () => void;
}
const StudioMenu = ({ saveNotes }: StudioMenuProps) => {
  const StudioheaderDropdownList = [
    { label: '임시저장', onClick: saveNotes },
    { label: '내보내기', onClick: undefined },
    { label: '제출하기', onClick: undefined },
  ];

  return (
    <div className="studio__header-menu">
      <HamburgerIcon size="small" color="white" />
      <div className="studio__header-dropdown">
        <Dropdown items={StudioheaderDropdownList} />
      </div>
    </div>
  );
};

export default StudioMenu;
