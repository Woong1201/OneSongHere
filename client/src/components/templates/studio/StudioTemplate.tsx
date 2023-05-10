import StudioHeader from 'components/organisms/studio/StudioHeader';
import React, { useState } from 'react';
import './StudioTemplate.scss';
import StudioNote from 'components/organisms/studio/StudioNote';
import StudioInstrument from 'components/organisms/studio/StudioInstrument';
import StudioCam from 'components/organisms/studio/StudioCam';
import StudioChat from 'components/organisms/studio/StudioChat';
import Note from 'types/Note';

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

  return (
    <>
      <StudioHeader notes={notes} />
      <div className="studio__body">
        <div className="studio__content">
          <StudioNote addNote={addNote} />
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
