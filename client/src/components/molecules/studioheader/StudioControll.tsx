import React from 'react';
import './StudioControll.scss';
import LogoIcon from 'components/atoms/common/LogoIcon';
import PlayIcon from 'components/atoms/stuidioHeader/PlayIcon';
import StopIcon from 'components/atoms/stuidioHeader/StopIcon';

const StudioControll = () => {
  return (
    <div className="studio__header-controll">
      <LogoIcon goHome size="small" whiteMode />
      <div className="studio__header-controll-icon">
        <PlayIcon size={30} />
      </div>
      <div className="studio__header-controll-icon">
        <StopIcon size={30} />
      </div>
    </div>
  );
};

export default StudioControll;
