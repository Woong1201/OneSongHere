import React, { useState } from 'react';
import './StudioNoteItem.scss';

interface StudioNoteItemProps {
  rowIndex: number;
  columnIndex: number;
}

const StudioNoteItem = ({ rowIndex, columnIndex }: StudioNoteItemProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const selectNote = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      type="button"
      className={['studio__note-item', '--selected'].join(' ')}
      onClick={selectNote}
    >
      {/* {rowIndex}-{columnIndex} */}
    </button>
  );
};

export default StudioNoteItem;
