import StudioHeader from 'components/organisms/studio/StudioHeader';
import React from 'react';
import './StudioTemplate.scss';
import StudioNote from 'components/organisms/studio/StudioNote';
import StudioInstrument from 'components/organisms/studio/StudioInstrument';
import StudioCam from 'components/organisms/studio/StudioCam';
import StudioChat from 'components/organisms/studio/StudioChat';

const StudioTemplate = () => {
  return (
    <>
      <StudioHeader />
      <div className="studio__body">
        <div className="studio__content">
          <StudioNote />
          <StudioInstrument />
        </div>
        <div className="studio__side">
          <StudioCam />
          <StudioChat />
        </div>
      </div>
    </>
  );
};

export default StudioTemplate;
