import React from 'react';
import './StudioChordCardList.scss';
import { Note } from 'types/Note';
import { Chord } from 'types/Chord';
import StudioChordCard from './StudioChordCard';

interface StudioChordCardListProps {
  chordNotes: Record<Chord, Note>;
  updateChord: (chord: Chord) => void;
}

const convertedCardList: Record<Chord, string> = {
  C: 'C major',
  G: 'G major',
  D: 'D major',
  A: 'A major',
  E: 'E major',
  B: 'B major',
  Am: 'A minor',
  Em: 'E minor',
  Bm: 'B minor',
  'F#m': 'F# minor',
  'C#m': 'C# minor',
  'G#m': 'G# minor',
};

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
            chordName={convertedCardList[chord as Chord]}
            noteNames={note.names as [string, string, string]}
          />
        );
      })}
    </div>
  );
};

export default StudioChordCardList;
