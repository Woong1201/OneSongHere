import React from 'react';
import './StudioNoteGrid.scss';
import StudioNoteColumn from './StudioNoteColumn';

interface StudioNoteColumnProps {
  addNote?: (name: string, timing: number) => void;
}
const Row = 150;

const StudioNoteGrid = ({ addNote }: StudioNoteColumnProps) => {
  return (
    <div className="studio__note-grid">
      {Array.from({ length: Row }, (_, rowIndex) => {
        return (
          <StudioNoteColumn
            addNote={addNote}
            key={rowIndex}
            timing={rowIndex * 0.25}
          />
        );
      })}
    </div>
  );
};

export default StudioNoteGrid;
