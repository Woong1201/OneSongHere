import React from 'react';
import './StudioChordCardList.scss';
import { Chord, ChordValue } from 'types/Chord';
import StudioChordCard from './StudioChordCard';

interface StudioChordCardListProps {
  chordNotes: Record<Chord, ChordValue>;
  updateChord: (chord: Chord) => void;
}

const StudioChordCardList = ({
  chordNotes,
  updateChord,
}: StudioChordCardListProps) => {
  return (
    <div className="studio__card-list">
      {Object.entries(chordNotes).map(([chord, note]) => {
        return (
          <StudioChordCard
            onClick={updateChord}
            key={chord}
            chordName={chord as Chord}
            noteNames={note.notes as [string, string, string]}
          />
        );
      })}
    </div>
  );
};

export default StudioChordCardList;
