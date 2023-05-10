import StudioHeader from 'components/organisms/studio/StudioHeader';
import React, { useState, useEffect } from 'react';
import './StudioTemplate.scss';
import StudioNote from 'components/organisms/studio/StudioNote';
import StudioInstrument from 'components/organisms/studio/StudioInstrument';
import StudioCam from 'components/organisms/studio/StudioCam';
import StudioChat from 'components/organisms/studio/StudioChat';
import Note from 'types/Note';
import * as Tone from 'tone';

const StudioTemplate = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const addNote = (name: string, timing: number) => {
    const newNotes = notes.map((note) => {
      return note.timing === timing
        ? { ...note, names: [...(note.names as string[]), name] }
        : note;
    });
    if (notes.length === newNotes.length) {
      setNotes([...notes, { names: [name], duration: '8n', timing }]);
    } else {
      setNotes(newNotes);
    }
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

  return (
    <>
      <StudioHeader notes={notes} pianoInstance={pianoInstance} />
      <div className="studio__body">
        <div className="studio__content">
          <StudioNote addNote={addNote} pianoInstance={pianoInstance} />
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
