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
    Array(150).fill(false)
  );

  const changePlayingStyle = (timing: number) => {
    // const element = document.getElementById(timing.toString());
    // console.log(element);
    // if (element) {
    //   element.classList.add('playing');
    // }
  };
  const revertPlayingStyle = (timing: number) => {
    const element = document.getElementById(timing.toString());
    if (element) {
      element.classList.remove('playing');
    }
  };

  return (
    <>
      <StudioHeader
        notes={notes}
        pianoInstance={pianoInstance}
        changePlayingStyle={changePlayingStyle}
        revertPlayingStyle={revertPlayingStyle}
        setNoteColumnStyle={setNoteColumnStyle}
      />
      <div className="studio__body">
        <div className="studio__content">
          <StudioNote
            notes={notes}
            updateNote={updateNote}
            pianoInstance={pianoInstance}
            noteColumnStyle={noteColumnStyle}
          />
          <StudioInstrument />
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
