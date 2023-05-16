import StudioNoteContainer from 'components/molecules/studionote/StudioNoteContainer';
import StudioNoteScroll from 'components/molecules/studionote/StudioNoteScroll';
import React, { useState } from 'react';
import './StudioNote.scss';
import { Note } from 'types/Note';

interface StudioNoteProps {
  scrollPosition: number;
  updateScrollPosition: (position: number) => void;
  notes: Note[];
  updateNote: (name: string, timing: number) => void;
  updateDrum: (name: string, timing: number | undefined) => void;
  playNote: (noteName: string | string[]) => void;
  playDrum: (beatPower: 'weak' | 'strong', drumType: 'kick' | 'snare') => void;
  noteColumnStyle: boolean[];
  columnNum: number;
}
const StudioNote = ({
  scrollPosition,
  updateScrollPosition,
  updateNote,
  updateDrum,
  playNote,
  playDrum,
  notes,
  noteColumnStyle,
  columnNum,
}: StudioNoteProps) => {
  return (
    <div className="studio__note">
      <StudioNoteScroll
        notes={notes}
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
        noteColumnStyle={noteColumnStyle}
        columnNum={columnNum}
      />
      <StudioNoteContainer
        notes={notes}
        scrollPosition={scrollPosition}
        updateScrollPosition={updateScrollPosition}
        updateNote={updateNote}
        updateDrum={updateDrum}
        playNote={playNote}
        playDrum={playDrum}
        noteColumnStyle={noteColumnStyle}
        columnNum={columnNum}
      />
    </div>
  );
};

export default StudioNote;
