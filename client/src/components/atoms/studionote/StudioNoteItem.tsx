import React, { useState } from 'react';
import './StudioNoteItem.scss';

interface StudioNoteItemProps {
  timing: number;
  note: string;
}

const StudioNoteItem = ({ timing, note }: StudioNoteItemProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const selectNote = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      type="button"
      className={['studio__note-item', '--selected'].join(' ')}
      onClick={selectNote}
      aria-label={`${timing}-${note}`}
    />
  );
};

export default StudioNoteItem;
