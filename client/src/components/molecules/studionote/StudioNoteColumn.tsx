import React from 'react';
import './StudioNoteColumn.scss';
import StudioNoteItem from 'components/atoms/studionote/StudioNoteItem';

interface StudioNoteColumnProps {
  timing: number;
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

const StudioNoteColumn = ({ timing }: StudioNoteColumnProps) => {
  return (
    <div className="studio__note-column">
      {noteList.map((note) => {
        const key = `${timing}-${note}`;
        return <StudioNoteItem key={key} timing={timing} note={note} />;
      })}
    </div>
  );
};

export default StudioNoteColumn;
