import React from 'react';
import './StudioInstrument.scss';
import StudioPiano from 'components/molecules/studioinstrument/StudioPiano';

const StudioInstrument = () => {
  return (
    <div className="studio__instrument">
      <div className="studio__piano-container">
        <StudioPiano />
      </div>
    </div>
  );
};

export default StudioInstrument;
