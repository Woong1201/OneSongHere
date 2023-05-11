import React, { useCallback, useState, useEffect } from 'react';
import './StudioNoteItem.scss';
import * as Tone from 'tone';

interface StudioNoteItemProps {
  timing: number;
  note: string;
  updateNote?: (name: string, timing: number) => void;
  playNote?: (noteName: string) => void;
  pianoInstance: Tone.Sampler | null;
  selected: boolean;
}

const StudioNoteItem = ({
  timing,
  note,
  updateNote,
  playNote,
  pianoInstance,
  selected,
}: StudioNoteItemProps) => {
  const [isSelected, setIsSelected] = useState(selected);

  const selectNote = () => {
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
