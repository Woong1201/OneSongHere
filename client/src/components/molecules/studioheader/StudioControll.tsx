import React, { useCallback, useEffect, useRef } from 'react';
import './StudioControll.scss';
import LogoIcon from 'components/atoms/common/LogoIcon';
import PlayIcon from 'components/atoms/studioheader/PlayIcon';
import StopIcon from 'components/atoms/studioheader/StopIcon';
import * as Tone from 'tone';
import { Note } from 'types/Note';
import Button from 'components/atoms/buttons/Button';

interface StudioControllProps {
  notes: Note[];
  instrumentInstances: {
    piano: Tone.Sampler | null;
    casio: Tone.Sampler | null;
    drum: {
      [key: string]: Tone.Player;
    } | null;
  };
  // currentInstrument: string;
  // changePlayingStyle: (timing: number) => void;
  // revertPlayingStyle: (timing: number) => void;
  setNoteColumnStyle: React.Dispatch<React.SetStateAction<boolean[]>>;
  clearNotes: () => void;
  inputScroll: (inputTiming: number) => void;
  findLastTiming: () => number;
  columnNum: number;
}

const StudioControll = ({
  notes,
  instrumentInstances,
  // currentInstrument,
  // changePlayingStyle,
  // revertPlayingStyle,
  setNoteColumnStyle,
  clearNotes,
  inputScroll,
  findLastTiming,
  columnNum,
}: StudioControllProps) => {
  const sequenceRef = useRef<Tone.Part | null>(null);
  const playingBarTasksRef = useRef<NodeJS.Timeout[]>([]);

  const playNote = useCallback(
    (time: number, note: number | Note) => {
      const currentNote = note as Note;
      if (
        currentNote.instrumentType === 'melody' &&
        instrumentInstances.piano != null
      ) {
        instrumentInstances.piano.triggerAttackRelease(
          currentNote.names,
          currentNote.duration,
          time
        );
      } else if (
        currentNote.instrumentType === 'beat' &&
        instrumentInstances.drum != null
      ) {
        if (currentNote.names) {
          const drumInstance =
            instrumentInstances.drum?.[currentNote.names as string];
          if (drumInstance) {
            drumInstance.start(time);
          }
        }
      }

      setNoteColumnStyle((prevStyle) => {
        const newStyle = [...prevStyle];
        newStyle[currentNote.timing * 4] = true;
        return newStyle;
      });

      Tone.Draw.schedule(() => {
        setNoteColumnStyle((prevStyle) => {
          const newStyle = [...prevStyle];
          newStyle[currentNote.timing * 4] = false;
          return newStyle;
        });
      }, time + currentNote.duration);
    },
    [instrumentInstances, setNoteColumnStyle]
  );

  useEffect(() => {
    sequenceRef.current = new Tone.Part(
      playNote,
      notes.map((note) => [note.timing * 1, note])
    );

    return () => {
      sequenceRef.current?.dispose();
      sequenceRef.current = null;
    };
  }, [notes, playNote]);

  const stopSequence = useCallback(() => {
    sequenceRef.current?.stop();
    Tone.Transport.stop();
    playingBarTasksRef.current.forEach(clearTimeout);
    playingBarTasksRef.current = [];
    setNoteColumnStyle(Array(columnNum).fill(false));
  }, []);

  const playSequence = useCallback(() => {
    if (Tone.Transport.state === 'started') {
      stopSequence();
    }

    sequenceRef.current = new Tone.Part(
      playNote,
      notes.map((note) => [note.timing, note])
    );

    sequenceRef.current?.start();
    Tone.Transport.start();

    const playLength = findLastTiming() * 4;
    Array.from({ length: playLength }, (_, i) => {
      const playBar = setTimeout(() => {
        setNoteColumnStyle((prevStyle) => {
          const newStyle = [...prevStyle];
          newStyle[i] = true;
          inputScroll(i * 0.25);
          return newStyle;
        });
      }, i * 250);

      const stopBar = setTimeout(() => {
        setNoteColumnStyle((prevStyle) => {
          const newStyle = [...prevStyle];
          newStyle[i] = false;
          return newStyle;
        });
      }, (i + 0.75) * 250);

      playingBarTasksRef.current.push(playBar);
      playingBarTasksRef.current.push(stopBar);
      return null;
    });
  }, [notes, setNoteColumnStyle]);

  return (
    <div className="studio__header-controll">
      <LogoIcon goHome size="small" whiteMode />
      <div className="studio__header-buttons">
        <button
          type="button"
          onClick={playSequence}
          className="studio__header-controll-icon"
        >
          <PlayIcon size={30} />
        </button>
        <button
          type="button"
          onClick={stopSequence}
          className="studio__header-controll-icon"
        >
          <StopIcon size={30} />
        </button>
      </div>
      <div className="studio__header-clear-button">
        <Button
          size="small"
          color="primary"
          label="지우기"
          type="button"
          onClick={clearNotes}
        />
      </div>
    </div>
  );
};

export default StudioControll;
