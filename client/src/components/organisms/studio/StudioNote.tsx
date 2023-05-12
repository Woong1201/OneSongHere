import StudioNoteContainer from 'components/molecules/studionote/StudioNoteContainer';
import StudioNoteScroll from 'components/molecules/studionote/StudioNoteScroll';
import React, { useState } from 'react';
import './StudioNote.scss';
import Note from 'types/Note';

interface StudioNoteProps {
  notes: Note[];
  updateNote: (name: string, timing: number) => void;
  playNote: (noteName: string | string[]) => void;
  noteColumnStyle: boolean[];
}
const StudioNote = ({
  updateNote,
  playNote,
  notes,
  noteColumnStyle,
}: StudioNoteProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScrollPosition = (position: number) => {
    setScrollPosition(position);
  };

  return (
    <div className="studio__note">
      <StudioNoteScroll
        notes={notes}
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
        noteColumnStyle={noteColumnStyle}
      />
      <StudioNoteContainer
        notes={notes}
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
        updateNote={updateNote}
        playNote={playNote}
        noteColumnStyle={noteColumnStyle}
      />
    </div>
  );
};

export default StudioNote;
