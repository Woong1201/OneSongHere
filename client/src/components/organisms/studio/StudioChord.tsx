import React from 'react';
import './StudioChord.scss';
import { Chord, ChordValue } from 'types/Chord';
import StudioChordCardList from 'components/molecules/studiochord/StudioChordCardList';

interface StudioChordProps {
  chordNotes: Record<Chord, ChordValue>;
  updateChord: (chord: Chord) => void;
}

const StudioChord = ({ chordNotes, updateChord }: StudioChordProps) => {
  return (
    <div className="studio__chord">
      <StudioChordCardList chordNotes={chordNotes} updateChord={updateChord} />
    </div>
  );
};

export default StudioChord;
