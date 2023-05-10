import StudioHeader from 'components/organisms/studio/StudioHeader';
import React from 'react';
import './StudioTemplate.scss';
import StudioNote from 'components/organisms/studio/StudioNote';
import StudioInstrument from 'components/organisms/studio/StudioInstrument';
import StudioCam from 'components/organisms/studio/StudioCam';
import StudioChat from 'components/organisms/studio/StudioChat';

const StudioTemplate = () => {
  const notes = [
    { note: ['D#5'], duration: '4n', timing: 0.125 },
    { note: ['E5'], duration: '4n', timing: 0.25 },
    { note: ['D#5'], duration: '4n', timing: 0.375 },
    { note: ['Eb4', 'G4', 'Bb4'], duration: '4n', timing: 0.5 },
    { note: ['B4'], duration: '4n', timing: 0.725 },
    { note: ['C5'], duration: '4n', timing: 0.975 },
    { note: ['D#5'], duration: '4n', timing: 1.125 },
    { note: ['E5'], duration: '4n', timing: 1.25 },
    { note: ['F5'], duration: '4n', timing: 1.375 },
    { note: ['G5'], duration: '4n', timing: 1.5 },
  ];
  return (
    <>
      <StudioHeader notes={notes} />
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
