import React from 'react';
import './StudioNoteContainer.scss';
import StudioNoteColumn from './StudioNoteColumn';

const Row = 50;

const StudioNoteContainer = () => {
  return (
    <div className="studio__note-container">
      {Array.from({ length: Row }, (_, rowIndex) => {
        return <StudioNoteColumn key={rowIndex} rowIndex={rowIndex} />;
      })}
    </div>
  );
};

export default StudioNoteContainer;
