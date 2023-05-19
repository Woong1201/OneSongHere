import React, { useState } from 'react';
import { Chord, ChordValue } from 'types/Chord';
import { Note } from 'types/Note';
import StudioChord from './StudioChord';
import StudioTabList from './StudioTabList';
import StudioRecommend from './StudioRecommend';
import './StudioWork.scss';

interface StudioWorkProps {
  chordNotes: Record<Chord, ChordValue>;
  updateChord: (chord: Chord) => void;
  myNotes: Note[];
  recommendedNotes: Note[];
  setRecommendedNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

const StudioWork = ({
  chordNotes,
  updateChord,
  myNotes,
  recommendedNotes,
  setRecommendedNotes,
}: StudioWorkProps) => {
  const [currentTab, setCurrentTab] = useState(1);

  const changeTab = (tabId: number) => {
    setCurrentTab(tabId);
  };

  return (
    <div className="studio__work">
      <StudioTabList currentTab={currentTab} changeTab={changeTab} />
      {currentTab === 1 && (
        <StudioChord chordNotes={chordNotes} updateChord={updateChord} />
      )}
      {currentTab === 2 && (
        <StudioRecommend
          myNotes={myNotes}
          recommendedNotes={recommendedNotes}
          setRecommendedNotes={setRecommendedNotes}
        />
      )}
    </div>
  );
};

export default StudioWork;
