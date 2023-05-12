import React from 'react';
import './StudioNoteGrid.scss';
import { Note } from 'types/Note';
import StudioNoteColumn from './StudioNoteColumn';

interface StudioNoteColumnProps {
  notes: Note[];
  updateNote?: (name: string, timing: number) => void;
  playNote?: (noteName: string | string[]) => void;
  noteColumnStyle: boolean[];
}
const Row = 160;

const StudioNoteGrid = ({
  notes,
  updateNote,
  playNote,
  noteColumnStyle,
}: StudioNoteColumnProps) => {
  return (
    <div className="studio__note-grid">
      {Array.from({ length: Row }, (_, rowIndex) => {
        const columnNote = notes.find((note) => {
          return note.timing === rowIndex * 0.25;
        });
        return (
          <StudioNoteColumn
            columnNote={columnNote}
            updateNote={updateNote}
            playNote={playNote}
            key={rowIndex}
            timing={rowIndex * 0.25}
            noteStyle={noteColumnStyle[rowIndex]}
          />
        );
      })}
    </div>
  );
};

export default StudioNoteGrid;
