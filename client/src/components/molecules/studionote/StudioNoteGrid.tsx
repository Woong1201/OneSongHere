import React from 'react';
import './StudioNoteGrid.scss';
import * as Tone from 'tone';
import StudioNoteColumn from './StudioNoteColumn';

interface StudioNoteColumnProps {
  updateNote?: (name: string, timing: number) => void;
  pianoInstance: Tone.Sampler | null;
}
const Row = 150;

const StudioNoteGrid = ({
  updateNote,
  pianoInstance,
}: StudioNoteColumnProps) => {
  return (
    <div className="studio__note-grid">
      {Array.from({ length: Row }, (_, rowIndex) => {
        return (
          <StudioNoteColumn
            updateNote={updateNote}
            key={rowIndex}
            timing={rowIndex * 0.25}
            pianoInstance={pianoInstance}
          />
        );
      })}
    </div>
  );
};

export default StudioNoteGrid;
