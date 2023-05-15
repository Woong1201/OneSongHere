import React from 'react';
import './StudioChord.scss';
import { Note } from 'types/Note';
import { Chord } from 'types/Chord';
import StudioChordCard from 'components/molecules/studiochord/StudioChordCard';
import StudioChordCardList from 'components/molecules/studiochord/StudioChordCardList';
import SectionTitle from 'components/atoms/common/SectionTitle';

interface StudioChordProps {
  chordNotes: Record<Chord, Note>;
  updateChord: (chord: Chord) => void;
}

const StudioChord = ({ chordNotes, updateChord }: StudioChordProps) => {
  return (
    <div className="studio__chord">
      <div className="studio__chord-title-area">
        <SectionTitle title="코드 입력" />
      </div>
      <StudioChordCardList chordNotes={chordNotes} updateChord={updateChord} />
    </div>
  );
};

export default StudioChord;
