import React from 'react';
import './StudioChord.scss';
import { Chord, ChordValue } from 'types/Chord';
import StudioChordCardList from 'components/molecules/studiochord/StudioChordCardList';
import SectionTitle from 'components/atoms/common/SectionTitle';

interface StudioChordProps {
  chordNotes: Record<Chord, ChordValue>;
  updateChord: (chord: Chord) => void;
}

const StudioChord = ({ chordNotes, updateChord }: StudioChordProps) => {
  return (
    <div className="studio__chord">
      <div className="studio__chord-title-area">
        <SectionTitle title="코드 입력" />
      </div>
      <div className="studio__chord-content-area">
        <StudioChordCardList
          chordNotes={chordNotes}
          updateChord={updateChord}
        />
      </div>
    </div>
  );
};

export default StudioChord;
