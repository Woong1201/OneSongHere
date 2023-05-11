import React from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
// import 'react-piano/dist/styles.css';
import './StudioPiano.scss';

const firstNote = MidiNumbers.fromNote('c4');
const lastNote = MidiNumbers.fromNote('b5');
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote,
  lastNote,
  keyboardConfig: KeyboardShortcuts.HOME_ROW,
});

const StudioPiano = () => {
  return (
    <Piano
      noteRange={{ first: firstNote, last: lastNote }}
      playNote={(midiNumber: string) => {
        console.log(midiNumber);
      }}
      stopNote={(midiNumber: string) => {
        console.log(midiNumber);
      }}
      width={1000}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
};

export default StudioPiano;
