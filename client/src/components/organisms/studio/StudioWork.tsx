import React, { useState } from 'react';
import { Chord, ChordValue } from 'types/Chord';
import StudioChord from './StudioChord';
import StudioTabList from './StudioTabList';
import StudioRecommend from './StudioRecommend';

interface StudioWorkProps {
  chordNotes: Record<Chord, ChordValue>;
  updateChord: (chord: Chord) => void;
}

const StudioWork = ({ chordNotes, updateChord }: StudioWorkProps) => {
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
      {currentTab === 2 && <StudioRecommend />}
    </>
  );
};

export default StudioWork;
