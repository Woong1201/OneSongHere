import React, { useCallback, useState } from 'react';
import './StudioMenu.scss';
import HamburgerIcon from 'components/atoms/common/HamburgerIcon';
import Dropdown from 'components/molecules/header/Dropdown';
import AlbumModal from 'components/organisms/modal/AlbumModal';

interface StudioMenuProps {
  status: number;
  saveNotes: () => void;
  submitNotes: () => void;
}
const StudioMenu = ({ status, saveNotes, submitNotes }: StudioMenuProps) => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);

  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const StudioheaderDropdownList = [
    { label: '임시저장', onClick: saveNotes },
    { label: '내보내기', onClick: undefined },
    { label: '제출하기', onClick: submitNotes },
  ];
  const CompleteStudioheaderDropdownList = [
    { label: '임시저장', onClick: saveNotes },
    { label: '내보내기', onClick: undefined },
    { label: '완성하기', onClick: onClickModal },
  ];

  return (
    <div className="studio__header-menu">
      <HamburgerIcon size="small" color="white" />
      <div className="studio__header-dropdown">
        {status === 4 ? (
          <Dropdown items={CompleteStudioheaderDropdownList} />
        ) : (
          <Dropdown items={StudioheaderDropdownList} />
        )}
      </div>
      {isOpenModal && (
        <div>
          <AlbumModal onClickModal={onClickModal} />
        </div>
      )}
    </div>
  );
};

export default StudioMenu;
