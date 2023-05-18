import React from 'react';
import './StudioNoteColumn.scss';
import StudioNoteItem from 'components/atoms/studionote/StudioNoteItem';
import { Note } from 'types/Note';
import StudioDrumItem from 'components/atoms/studionote/StudioDrumItem';

interface StudioNoteColumnProps {
  columnNotes: Note[] | undefined;
  rowIndex: number;
  updateNote?: (name: string, timing: number) => void;
  updateDrum?: (name: string, timing: number | undefined) => void;
  playNote?: (noteName: string | string[]) => void;
  playDrum?: (beatPower: 'weak' | 'strong', drumType: 'kick' | 'snare') => void;
  playing?: boolean;
  disabled?: boolean;
  currentComposerId: number;
  currentUserId: number;
}

const Column = 24;

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
].reverse();

const StudioNoteColumn = ({
  columnNotes,
  rowIndex,
  updateNote,
  updateDrum,
  playNote,
  playDrum,
  playing = false,
  disabled = false,
  currentComposerId,
  currentUserId,
}: StudioNoteColumnProps) => {
  const playingStyle = playing ? 'studio__note-column--playing' : '';
  const disabledStyle = disabled ? 'studio__note-column--disabled' : null;

  const timing = rowIndex * 0.25;
  const drumPower = rowIndex % 2 === 0 ? 'strong' : 'weak';
  const melodyNote = columnNotes?.find((columnNote) => {
    return columnNote.instrumentType === 'melody';
  });
  const snareNoteSelected =
    columnNotes?.some((columnNote) => {
      return (
        columnNote.instrumentType === 'beat' && columnNote.names === 'snare'
      );
    }) || false;
  const kickNoteSelected =
    columnNotes?.some((columnNote) => {
      return (
        columnNote.instrumentType === 'beat' && columnNote.names === 'kick'
      );
    }) || false;

  return (
    <div
      className={['studio__note-column', playingStyle, disabledStyle].join(' ')}
      id={timing.toString()}
    >
      {noteList.map((note) => {
        const key = `${timing}-${note}`;

        const isSelected = melodyNote?.names.includes(note) || false;
        return (
          <StudioNoteItem
            updateNote={updateNote}
            key={key}
            timing={timing}
            note={note}
            selected={isSelected}
            playNote={playNote}
            disabled={disabled}
            currentComposerId={currentComposerId}
            currentUserId={currentUserId}
          />
        );
      })}
      <StudioDrumItem
        timing={timing}
        power={drumPower}
        playDrum={playDrum}
        updateDrum={updateDrum}
        type="snare"
        selected={snareNoteSelected}
        disabled={disabled}
      />
      <StudioDrumItem
        timing={timing}
        power={drumPower}
        playDrum={playDrum}
        updateDrum={updateDrum}
        type="kick"
        selected={kickNoteSelected}
        disabled={disabled}
      />
    </div>
  );
};

export default StudioNoteColumn;
