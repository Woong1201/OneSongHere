import React, { useCallback, useState } from 'react';
import './StudioNoteItem.scss';
import * as Tone from 'tone';

interface StudioNoteItemProps {
  timing: number;
  note: string;
  updateNote?: (name: string, timing: number) => void;
  pianoInstance: Tone.Sampler | null;
}

const StudioNoteItem = ({
  timing,
  note,
  updateNote,
  pianoInstance,
}: StudioNoteItemProps) => {
  const [isSelected, setIsSelected] = useState(false);

  const playNote = useCallback(
    (noteName: string) => {
      if (pianoInstance !== null) {
        pianoInstance.triggerAttackRelease(noteName, '8n');
      }
    },
    [pianoInstance]
  );

  const selectNote = () => {
    setIsSelected(!isSelected);
    if (updateNote !== undefined) {
      playNote(note);
      updateNote(note, timing);
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
