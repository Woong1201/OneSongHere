import React, { useState } from 'react';
import './StudioNoteItem.scss';

interface StudioNoteItemProps {
  timing: number;
  note: string;
  addNote?: (name: string, timing: number) => void;
}

const StudioNoteItem = ({ timing, note, addNote }: StudioNoteItemProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const selectNote = () => {
    setIsSelected(!isSelected);
    if (addNote !== undefined) {
      addNote(note, timing);
    }
  };

  return (
    <button
      type="button"
      className={[
        'studio__note-item',
        isSelected ? 'studio__note-item--selected' : '',
      ].join(' ')}
      onClick={selectNote}
      aria-label={`${timing}-${note}`}
    />
  );
};

export default StudioNoteItem;
