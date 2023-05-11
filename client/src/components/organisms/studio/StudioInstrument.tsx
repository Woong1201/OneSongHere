import React from 'react';
import './StudioInstrument.scss';
import StudioPiano from 'components/molecules/studioinstrument/StudioPiano';

interface StudioInstrumentProps {
  updateNote: (name: string, timing: number) => void;
  findInputTiming: () => number;
  playNote: (noteName: string) => void;
}
const StudioInstrument = ({
  findInputTiming,
  updateNote,
  playNote,
}: StudioInstrumentProps) => {
  return (
    <div className="studio__instrument">
      <div className="studio__piano-container">
        <StudioPiano
          updateNote={updateNote}
          findInputTiming={findInputTiming}
          playNote={playNote}
        />
      </div>
    </div>
  );
};

export default StudioInstrument;
