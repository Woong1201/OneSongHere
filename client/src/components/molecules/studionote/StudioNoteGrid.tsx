import React from 'react';
import './StudioNoteGrid.scss';
import StudioNoteColumn from './StudioNoteColumn';

const Row = 150;

const StudioNoteGrid = () => {
  return (
    <div className="studio__note-grid">
      {Array.from({ length: Row }, (_, rowIndex) => {
        return <StudioNoteColumn key={rowIndex} timing={rowIndex * 0.25} />;
      })}
    </div>
  );
};

export default StudioNoteGrid;
