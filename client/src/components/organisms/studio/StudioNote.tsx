import StudioNoteContainer from 'components/molecules/studionote/StudioNoteContainer';
import StudioNoteScroll from 'components/molecules/studionote/StudioNoteScroll';
import React, { useState } from 'react';
import './StudioNote.scss';
import * as Tone from 'tone';

interface StudioNoteProps {
  updateNote: (name: string, timing: number) => void;
  pianoInstance: Tone.Sampler | null;
}
const StudioNote = ({ updateNote, pianoInstance }: StudioNoteProps) => {
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
        updateNote={updateNote}
        pianoInstance={pianoInstance}
      />
    </div>
  );
};

export default StudioNote;
