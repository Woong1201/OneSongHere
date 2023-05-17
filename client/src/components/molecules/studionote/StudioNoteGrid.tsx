import React, { useMemo } from 'react';
import './StudioNoteGrid.scss';
import { Note } from 'types/Note';
import StudioNoteColumn from './StudioNoteColumn';

interface StudioNoteColumnProps {
  notes: Note[];
  updateNote?: (name: string, timing: number) => void;
  updateDrum?: (name: string, timing: number | undefined) => void;
  playNote?: (noteName: string | string[]) => void;
  playDrum?: (beatPower: 'weak' | 'strong', drumType: 'kick' | 'snare') => void;
  noteColumnStyle: boolean[];
  columnNum: number;
  userOrder: number;
  barNum: number;
  studioStatus: number;
}

const StudioNoteGrid = ({
  notes,
  updateNote,
  updateDrum,
  playNote,
  playDrum,
  noteColumnStyle,
  columnNum,
  userOrder,
  barNum,
  studioStatus,
}: StudioNoteColumnProps) => {
  const Row = columnNum;
  const startInputPoint = useMemo(() => barNum * (userOrder - 1), [userOrder]);
  return (
    <div className="studio__note-grid">
      {Array.from({ length: Row }, (_, rowIndex) => {
        const columnNotes = notes.filter((note) => {
          return note.timing === rowIndex * 0.25;
        });
        const disabled =
          startInputPoint > rowIndex ||
          startInputPoint + barNum <= rowIndex ||
          studioStatus !== 2;
        return (
          <StudioNoteColumn
            columnNotes={columnNotes}
            updateNote={updateNote}
            updateDrum={updateDrum}
            playNote={playNote}
            playDrum={playDrum}
            key={rowIndex}
            rowIndex={rowIndex}
            playing={noteColumnStyle[rowIndex]}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
};

export default StudioNoteGrid;
