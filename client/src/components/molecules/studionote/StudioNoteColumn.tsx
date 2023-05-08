import React from 'react';
import './StudioNoteColumn.scss';
import StudioNoteItem from 'components/atoms/studionote/StudioNoteItem';

interface StudioNoteColumnProps {
  rowIndex: number;
}

const Column = 14;

const StudioNoteColumn = ({ rowIndex }: StudioNoteColumnProps) => {
  return (
    <div className="studio__note-column">
      {Array.from({ length: Column }, (_, columnIndex) => {
        const key = `${rowIndex}-${columnIndex}`;
        return (
          <StudioNoteItem
            key={key}
            rowIndex={rowIndex}
            columnIndex={columnIndex}
          />
        );
      })}
    </div>
  );
};

export default StudioNoteColumn;
