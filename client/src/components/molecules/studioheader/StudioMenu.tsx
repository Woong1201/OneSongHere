import React from 'react';
import './StudioMenu.scss';
import HamburgerIcon from 'components/atoms/common/HamburgerIcon';
import Dropdown from 'components/molecules/header/Dropdown';

const StudioMenu = () => {
  const StudioheaderDropdownList = [
    { label: '저장하기', onClick: undefined },
    { label: '내보내기', onClick: undefined },
    { label: '완성하기', onClick: undefined },
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
