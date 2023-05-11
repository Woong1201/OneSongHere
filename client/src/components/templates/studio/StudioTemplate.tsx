import StudioHeader from 'components/organisms/studio/StudioHeader';
import React, { useState, useEffect, useCallback } from 'react';
import './StudioTemplate.scss';
import StudioNote from 'components/organisms/studio/StudioNote';
import StudioInstrument from 'components/organisms/studio/StudioInstrument';
import StudioCam from 'components/organisms/studio/StudioCam';
import StudioChat from 'components/organisms/studio/StudioChat';
import Note from 'types/Note';
import * as Tone from 'tone';

const StudioTemplate = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const updateNote = useCallback(
    (name: string, timing: number) => {
      let isExistingNote = false;

      let updatedNotes = notes.map((note) => {
        if (note.timing === timing) {
          isExistingNote = true;

          if (note.names.includes(name)) {
            return {
              ...note,
              names: (note.names as string[]).filter((n) => n !== name),
            };
          }
          return { ...note, names: [...(note.names as string[]), name] };
        }
        return note;
      });

      if (!isExistingNote) {
        updatedNotes = [
          ...updatedNotes,
          { names: [name], duration: '8n', timing },
        ];
      }

      const cleanedNotes = updatedNotes.filter((note) => note.names.length > 0);

      setNotes(cleanedNotes);
    },
    [notes]
  );
  const findInputTiming = () => {
    // 0부터 0.25 * 150까지 배열
    const possibleNoteTiming = Array.from({ length: 160 }, (_, i) => i * 0.25);
    // 현재 타이밍들
    const timings = notes.map((note) => note.timing);
    // 그 배열중에 현재 배열에 notes에 없는 첫번째 타이밍값 리턴

    return possibleNoteTiming.find((num) => !timings.includes(num)) || 0;
  };

  const [pianoInstance, setPianoInstance] = useState<Tone.Sampler | null>(null);

  useEffect(() => {
    const sampler = new Tone.Sampler({
      urls: {
        C4: 'C4.mp3',
        'D#4': 'Ds4.mp3',
        'F#4': 'Fs4.mp3',
        A4: 'A4.mp3',
      },
      release: 1,
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
    }).toDestination();
    Tone.loaded().then(() => {
      setPianoInstance(sampler);
    });
  }, []);

  const [noteColumnStyle, setNoteColumnStyle] = useState(
    Array(160).fill(false)
  );

  const changePlayingStyle = (timing: number) => {
    const element = document.getElementById(timing.toString());
    if (element) {
      element.classList.add('playing');
    }
  };
  const revertPlayingStyle = (timing: number) => {
    const element = document.getElementById(timing.toString());
    if (element) {
      element.classList.remove('playing');
    }
  };

  const playNote = useCallback(
    (noteName: string) => {
      if (pianoInstance !== null) {
        pianoInstance.triggerAttackRelease(noteName, '8n');
      }
    },
    [pianoInstance]
  );

  const clearNotes = useCallback(() => {
    setNotes([]);
  }, [setNotes]);

  return (
    <>
      <StudioHeader
        notes={notes}
        pianoInstance={pianoInstance}
        changePlayingStyle={changePlayingStyle}
        revertPlayingStyle={revertPlayingStyle}
        setNoteColumnStyle={setNoteColumnStyle}
        clearNotes={clearNotes}
      />
      <div className="studio__body">
        <div className="studio__content">
          <StudioNote
            notes={notes}
            updateNote={updateNote}
            playNote={playNote}
            noteColumnStyle={noteColumnStyle}
          />
          <StudioInstrument
            updateNote={updateNote}
            findInputTiming={findInputTiming}
            playNote={playNote}
          />
        </div>
        <div className="studio__side">
          <StudioCam />
          <StudioChat />
        </div>
      </div>
    </>
  );
};

export default StudioTemplate;
