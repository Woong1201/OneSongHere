import React, { useState } from 'react';
import { Chord, ChordValue } from 'types/Chord';
import { Note } from 'types/Note';
import StudioChord from './StudioChord';
import StudioTabList from './StudioTabList';
import StudioRecommend from './StudioRecommend';

interface StudioWorkProps {
  chordNotes: Record<Chord, ChordValue>;
  updateChord: (chord: Chord) => void;
  myNotes: Note[];
}

const StudioWork = ({ chordNotes, updateChord, myNotes }: StudioWorkProps) => {
  const [currentTab, setCurrentTab] = useState(1);

  const changeTab = (tabId: number) => {
    setCurrentTab(tabId);
  };

  return (
    <>
      <StudioTabList currentTab={currentTab} changeTab={changeTab} />
      {currentTab === 1 && (
        <StudioChord chordNotes={chordNotes} updateChord={updateChord} />
      )}
      {currentTab === 2 && <StudioRecommend myNotes={myNotes} />}
    </>
  );
};

export default StudioWork;
