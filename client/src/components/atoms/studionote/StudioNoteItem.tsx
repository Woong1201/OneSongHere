import React, { useState, useEffect } from 'react';
import './StudioNoteItem.scss';
import * as Tone from 'tone';

interface StudioNoteItemProps {
  timing: number;
  note: string;
  addNote?: (name: string, timing: number) => void;
  pianoInstance: Tone.Sampler | null;
}

const StudioNoteItem = ({
  timing,
  note,
  addNote,
  pianoInstance,
}: StudioNoteItemProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const playNote = (noteName: string) => {
    if (pianoInstance !== null) {
      pianoInstance.triggerAttackRelease(noteName, '8n');
    }
  };

  const selectNote = () => {
    setIsSelected(!isSelected);
    if (addNote !== undefined) {
      playNote(note);
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