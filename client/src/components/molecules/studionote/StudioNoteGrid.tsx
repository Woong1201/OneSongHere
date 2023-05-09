import React from 'react';
import './StudioNoteGrid.scss';
import StudioNoteColumn from './StudioNoteColumn';

const Row = 150;

const StudioNoteGrid = () => {
  return (
    <div className="studio__note-grid">
      {Array.from({ length: Row }, (_, rowIndex) => {
        return <StudioNoteColumn key={rowIndex} rowIndex={rowIndex} />;
      })}
    </div>
  );
};

export default StudioNoteGrid;
