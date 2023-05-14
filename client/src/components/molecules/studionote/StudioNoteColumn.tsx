import React from 'react';
import './StudioNoteColumn.scss';
import StudioNoteItem from 'components/atoms/studionote/StudioNoteItem';
import { Note } from 'types/Note';
import StudioDrumItem from 'components/atoms/studionote/StudioDrumItem';

interface StudioNoteColumnProps {
  columnNote: Note | undefined;
  rowIndex: number;
  updateNote?: (name: string, timing: number) => void;
  playNote?: (noteName: string | string[]) => void;
  playDrum?: (beatPower: 'weak' | 'strong') => void;
  noteStyle: boolean;
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
  columnNote,
  rowIndex,
  updateNote,
  playNote,
  playDrum,
  noteStyle,
}: StudioNoteColumnProps) => {
  const columnClassNames = noteStyle
    ? 'studio__note-column playing'
    : 'studio__note-column';

  const timing = rowIndex * 0.25;
  const drumPower = rowIndex % 2 === 0 ? 'strong' : 'weak';

  return (
    <div className={columnClassNames} id={timing.toString()}>
      {noteList.map((note) => {
        const key = `${timing}-${note}`;
        const isSelected = columnNote?.names.includes(note) || false;
        return (
          <StudioNoteItem
            updateNote={updateNote}
            key={key}
            timing={timing}
            note={note}
            selected={isSelected}
            playNote={playNote}
          />
        );
      })}
      <StudioDrumItem power={drumPower} playDrum={playDrum} />
      <StudioDrumItem power={drumPower} playDrum={playDrum} />
    </div>
  );
};

export default StudioNoteColumn;
