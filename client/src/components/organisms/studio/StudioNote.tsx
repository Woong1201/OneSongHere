import StudioNoteContainer from 'components/molecules/studionote/StudioNoteContainer';
import StudioNoteScroll from 'components/molecules/studionote/StudioNoteScroll';
import React, { useState } from 'react';
import './StudioNote.scss';
import * as Tone from 'tone';

interface StudioNoteProps {
  addNote: (name: string, timing: number) => void;
  pianoInstance: Tone.Sampler | null;
}
const StudioNote = ({ addNote, pianoInstance }: StudioNoteProps) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const updateScrollPosition = (position: number) => {
    setScrollPosition(position);
  };

  return (
    <div className="studio__note">
      <StudioNoteScroll
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
        pianoInstance={pianoInstance}
      />
      <StudioNoteContainer
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
        addNote={addNote}
        pianoInstance={pianoInstance}
      />
    </div>
  );
};

export default StudioNote;
