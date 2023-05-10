import React from 'react';
import './StudioNoteColumn.scss';
import StudioNoteItem from 'components/atoms/studionote/StudioNoteItem';
import * as Tone from 'tone';

interface StudioNoteColumnProps {
  timing: number;
  addNote?: (name: string, timing: number) => void;
  pianoInstance: Tone.Sampler | null;
}

const Column = 24;

const noteList = [
  'C4',
  'C#4',
  'D4',
  'D#4',
  'E4',
  'F4',
  'F#4',
  'G4',
  'G#4',
  'A4',
  'A#4',
  'B4',
  'C5',
  'C#5',
  'D5',
  'D#5',
  'E5',
  'F5',
  'F#5',
  'G5',
  'G#5',
  'A5',
  'A#5',
  'B5',
].reverse();

const StudioNoteColumn = ({
  timing,
  addNote,
  pianoInstance,
}: StudioNoteColumnProps) => {
  return (
    <div className="studio__note-column">
      {noteList.map((note) => {
        const key = `${timing}-${note}`;
        return (
          <StudioNoteItem
            addNote={addNote}
            key={key}
            timing={timing}
            note={note}
            pianoInstance={pianoInstance}
          />
        );
      })}
    </div>
  );
};

export default StudioNoteColumn;
