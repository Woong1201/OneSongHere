import React, { useState, useEffect } from 'react';
import './StudioNoteItem.scss';

interface StudioNoteItemProps {
  timing: number;
  note: string;
  updateNote?: (name: string, timing: number) => void;
  playNote?: (noteName: string | string[]) => void;
  selected: boolean;
  disabled?: boolean;
}

const StudioNoteItem = ({
  timing,
  note,
  updateNote,
  playNote,
  selected,
  disabled = false,
}: StudioNoteItemProps) => {
  const [isSelected, setIsSelected] = useState(selected);
  const disabledNoteStyle = disabled ? 'studio__note-item--disabled' : '';
  const selectedStyle = isSelected ? 'studio__note-item--selected' : '';
  const selectNote = () => {
    if (disabled) return;
    setIsSelected(!isSelected);
    if (updateNote !== undefined && playNote !== undefined) {
      playNote(note);
      updateNote(note, timing);
    }
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <button
      type="button"
      className={['studio__note-item', disabledNoteStyle, selectedStyle].join(
        ' '
      )}
      onClick={selectNote}
      aria-label={`${timing}-${note}`}
    />
  );
};

export default StudioNoteItem;
