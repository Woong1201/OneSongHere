import StudioNoteContainer from 'components/molecules/studionote/StudioNoteContainer';
import StudioNoteScroll from 'components/molecules/studionote/StudioNoteScroll';
import React, { useState } from 'react';
import './StudioNote.scss';

interface StudioNoteProps {
  addNote: (name: string, timing: number) => void;
}
const StudioNote = ({ addNote }: StudioNoteProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScrollPosition = (position: number) => {
    setScrollPosition(position);
  };

  return (
    <div className="studio__note">
      <StudioNoteScroll
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
      />
      <StudioNoteContainer
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
        addNote={addNote}
      />
    </div>
  );
};

export default StudioNote;
