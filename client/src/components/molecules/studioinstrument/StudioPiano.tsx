import React, { useState, useEffect, useRef } from 'react';
import { Piano, KeyboardShortcuts, MidiNumbers } from 'react-piano';
// import 'react-piano/dist/styles.css';
import './StudioPiano.scss';

interface StudioPianoProps {
  updateNote: (name: string, timing: number) => void;
  findInputTiming: () => number | undefined;
  playNote: (noteName: string | string[]) => void;
}
const firstNote = MidiNumbers.fromNote('c4');
const lastNote = MidiNumbers.fromNote('b5');
const keyboardShortcuts = KeyboardShortcuts.create({
  firstNote,
  lastNote,
  keyboardConfig: [
    ...KeyboardShortcuts.HOME_ROW,
    { natural: '4', flat: '7', sharp: '8' },
    { natural: '5', flat: '8', sharp: '9' },
    { natural: '6', flat: '9', sharp: '+' },
  ],
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
  interface pressedNote {
    note: string;
    pressedDate: Date;
  }

  const [pressedNotes, setPressedNotes] = useState<pressedNote[]>([]);
  const pressedNotesRef = useRef(pressedNotes);

  useEffect(() => {
    pressedNotesRef.current = pressedNotes;
  }, [pressedNotes]);

  const pianoPlayNote = (midiNumber: string) => {
    const timing = findInputTiming();
    if (timing !== undefined) {
      const note = noteList[parseInt(midiNumber, 10) - 60];

      // pressedNotes에 값이 있고 현재 시간과 배열 첫번째 pressedNote의 pressedDate의 차이가 100 이하라면
      if (
        pressedNotes.length > 0 &&
        Date.now() - pressedNotes[0].pressedDate.getTime() < 50
      ) {
        // 기존 배열에 시간을 추가한다
        setPressedNotes((prevNotes: pressedNote[]) => [
          ...prevNotes,
          { note, pressedDate: new Date() },
        ]);
        // 100 이하가 아니면 그냥 그 Note만 하나 있는 배열로 set하고 다시 setTimeout 실행
      }
      // 값이 있어도 첫값과 차이가 100이하거나 값이 없으면
      else {
        // 배열을 리셋해서 값을 넣고 100 밀리초 후에 pressededNotes를 다 재생한다
        setPressedNotes([{ note, pressedDate: new Date() }]);
        setTimeout(() => {
          const currentPressedNotes = pressedNotesRef.current;
          playNote(
            currentPressedNotes.map((pressedNote) => {
              return pressedNote.note;
            })
          );
          currentPressedNotes.forEach((pressedNote) => {
            updateNote(pressedNote.note, timing);
          });
          setPressedNotes([]);
        }, 50);
      }
    }
  };

  const pianoStopNote = (midiNumber: string) => {
    console.log(midiNumber);
  };

  const noteRange = { first: firstNote, last: lastNote };

  return (
    <Piano
      noteRange={noteRange}
      playNote={pianoPlayNote}
      stopNote={pianoStopNote}
      width={1000}
      keyboardShortcuts={keyboardShortcuts}
    />
  );
};

export default StudioPiano;
