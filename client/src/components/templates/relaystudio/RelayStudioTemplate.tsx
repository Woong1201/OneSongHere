import StudioHeader from 'components/organisms/studio/StudioHeader';
import React, { useState, useEffect, useCallback } from 'react';
import './RelayStudioTemplate.scss';
import StudioNote from 'components/organisms/studio/StudioNote';
import StudioInstrument from 'components/organisms/studio/StudioInstrument';
import StudioCam from 'components/organisms/studio/StudioCam';
import StudioChat from 'components/organisms/studio/StudioChat';
import { useParams } from 'react-router-dom';
import { Note } from 'types/Note';
import { RelayStudioInfo } from 'types/RelayStudio';
import * as Tone from 'tone';
import { getRelayStudioInfo, postRelayNotes } from 'services/relayStudio';

const RelayStudioTemplate = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [studioInfo, setStudioInfo] = useState<RelayStudioInfo>();
  const [pianoInstance, setPianoInstance] = useState<Tone.Sampler | null>(null);
  const [drumInstance, setDrumInstance] = useState<Tone.Sampler | null>(null);
  const [noteColumnStyle, setNoteColumnStyle] = useState(
    Array(160).fill(false)
  );

  const [noteScrollPosition, setNoteScrollPosition] = useState(0);

  const updateNoteScrollPosition = (position: number) => {
    setNoteScrollPosition(position);
  };

  const { relayStudioId } = useParams();
  const numRelayStudioId = Number(relayStudioId as string);

  useEffect(() => {
    getRelayStudioInfo(
      numRelayStudioId,
      ({ data }) => {
        setStudioInfo(data);
        const { relayStudioSheet } = data;
        if (notes.length === 0) {
          setNotes(JSON.parse(relayStudioSheet));
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

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

  // useEffect(() => {
  //   const sampler = new Tone.Sampler({
  //     urls: {
  //       C2: 'kick.mp3',
  //       G4: 'snare.mp3',
  //     },
  //     release: 1,
  //     baseUrl: 'https://your-audio-files-url/',
  //   }).toDestination();
  //   Tone.loaded().then(() => {
  //     setDrumInstance(sampler);
  //   });
  // }, []);

  const updateNote = useCallback(
    (name: string, timing: number | undefined) => {
      if (timing !== undefined) {
        setNotes((prevNotes) => {
          let isExistingNote = false;
          let updatedNotes = prevNotes.map((note) => {
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
          const cleanedNotes = updatedNotes.filter(
            (note) => note.names.length > 0
          );
          return cleanedNotes;
        });
        // 현재 스크롤에 보이는 35 * 34 = 1190 + scrollposition
        // 만약에 timing * 4 -> n번째 칸이 업데이트되는데 이 범위 밖에 있다면
        // 35 * n을 스크롤 포지션으로 설정
        const updatedNotePosition = timing * 4 * 35;
        if (
          updatedNotePosition < noteScrollPosition ||
          updatedNotePosition > 1195 + noteScrollPosition
        ) {
          setNoteScrollPosition(Math.max(updatedNotePosition - 50, 0));
        }
      }
    },
    [noteScrollPosition]
  );

  const findInputTiming = () => {
    // 0부터 0.25 * 150까지 배열
    const possibleNoteTiming = Array.from({ length: 160 }, (_, i) => i * 0.25);
    // 현재 타이밍들
    const timings = notes.map((note) => note.timing);
    // 그 배열중에 현재 배열에 notes에 없는 첫번째 타이밍값 리턴

    return possibleNoteTiming.find((num) => !timings.includes(num));
  };

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
    (noteName: string | string[]) => {
      if (pianoInstance !== null) {
        pianoInstance.triggerAttackRelease(noteName, '8n');
      }
    },
    [pianoInstance]
  );

  const clearNotes = useCallback(() => {
    setNotes([]);
  }, [setNotes]);

  const saveRelayNotes = () => {
    const relayStudioID = numRelayStudioId;
    const stringNote = JSON.stringify(notes);
    const complete = false;
    const noteData = {
      relayStudioID,
      relayStudioSheet: stringNote,
      complete,
    };
    postRelayNotes(
      noteData,
      ({ data }) => {
        const { relayStudioSheet } = data;
        setNotes(JSON.parse(relayStudioSheet));
      },
      (error) => {
        console.log('에러', error);
      }
    );
  };

  const playDrum = useCallback(
    (beatPower: 'weak' | 'strong') => {
      console.log(beatPower);
    },
    [drumInstance]
  );

  return (
    <>
      <StudioHeader
        studioInfo={studioInfo}
        notes={notes}
        pianoInstance={pianoInstance}
        changePlayingStyle={changePlayingStyle}
        revertPlayingStyle={revertPlayingStyle}
        setNoteColumnStyle={setNoteColumnStyle}
        clearNotes={clearNotes}
        saveNotes={saveRelayNotes}
      />
      <div className="relay-studio__body">
        <div className="relay-studio__content">
          <StudioNote
            scrollPosition={noteScrollPosition}
            updateScrollPosition={updateNoteScrollPosition}
            notes={notes}
            updateNote={updateNote}
            playNote={playNote}
            playDrum={playDrum}
            noteColumnStyle={noteColumnStyle}
          />
          <StudioInstrument
            updateNote={updateNote}
            findInputTiming={findInputTiming}
            playNote={playNote}
          />
        </div>
        <div className="relay-studio__side">
          <StudioCam />
          <StudioChat />
        </div>
      </div>
    </>
  );
};

export default RelayStudioTemplate;
