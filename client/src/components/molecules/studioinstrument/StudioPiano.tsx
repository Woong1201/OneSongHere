import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
// import 'react-piano/dist/styles.css';
import './StudioPiano.scss';

interface StudioPianoProps {
  updateNote: (name: string, timing: number) => void;
  findInputTiming: () => number;
  playNote: (noteName: string) => void;
}
const firstNote = MidiNumbers.fromNote('c4');
const lastNote = MidiNumbers.fromNote('b5');
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote,
  lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const StudioPiano = ({
  findInputTiming,
  updateNote,
  playNote,
}: StudioPianoProps) => {
  const noteList = [
    'C4',
    'C#4',
    'D4',
    'D#4',
    'E4',
    'F4',
    'F#4',
    'G4',
    'G#4',
    'A4',
    'A#4',
    'B4',
    'C5',
    'C#5',
    'D5',
    'D#5',
    'E5',
    'F5',
    'F#5',
    'G5',
    'G#5',
    'A5',
    'A#5',
    'B5',
  ];

  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber: string) => {
        const note = noteList[parseInt(midiNumber, 10) - 60];
        const timing = findInputTiming();
        playNote(note);
        updateNote(note, timing);
      }}
      stopNote={(midiNumber: string) => {
        console.log(2, midiNumber);
      }}
      width={1000}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
};

export default StudioPiano;
