import StudioHeader from 'components/organisms/studio/StudioHeader';
import React, { useState, useEffect, useCallback } from 'react';
import './RelayStudioTemplate.scss';
import StudioNote from 'components/organisms/studio/StudioNote';
import StudioInstrument from 'components/organisms/studio/StudioInstrument';
import StudioCam from 'components/organisms/studio/StudioCam';
import { useParams } from 'react-router-dom';
import { Note } from 'types/Note';
import { Chord } from 'types/Chord';
import { RelayStudioInfo } from 'types/RelayStudio';
import * as Tone from 'tone';
import { getRelayStudioInfo, postRelayNotes } from 'services/relayStudio';
import StudioChord from 'components/organisms/studio/StudioChord';

const RelayStudioTemplate = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [studioInfo, setStudioInfo] = useState<RelayStudioInfo>();
  const [instrumentInstances, setInstrumentInstances] = useState<{
    piano: Tone.Sampler | null;
    casio: Tone.Sampler | null;
    drum: { [key: string]: Tone.Player } | null; // 수정된 부분
  }>({
    piano: null,
    casio: null,
    drum: null,
  });

  const [currentInstrument, setCurrentInstrument] = useState<string>('piano');
  const [currentDrum, setCurrentDrum] = useState<string>('drum');

  const [noteColumnStyle, setNoteColumnStyle] = useState(
    Array(160).fill(false)
  );

  const [noteScrollPosition, setNoteScrollPosition] = useState(0);

  const updateNoteScrollPosition = (position: number) => {
    setNoteScrollPosition(position);
  };

  const chordNotes: Record<Chord, Note> = {
    // C Major
    C: {
      names: ['C4', 'E4', 'G4'],
      duration: '4n',
      timing: 0,
      instrumentType: 'melody',
    },
    // G Major
    G: {
      names: ['G4', 'B4', 'D5'],
      duration: '4n',
      timing: 1,
      instrumentType: 'melody',
    },
    // D Major
    D: {
      names: ['D4', 'F#4', 'A4'],
      duration: '4n',
      timing: 2,
      instrumentType: 'melody',
    },
    // A Major
    A: {
      names: ['A4', 'C#5', 'E5'],
      duration: '4n',
      timing: 3,
      instrumentType: 'melody',
    },
    // E Major
    E: {
      names: ['E4', 'G#4', 'B4'],
      duration: '4n',
      timing: 4,
      instrumentType: 'melody',
    },
    // B Major
    B: {
      names: ['B4', 'D#5', 'F#5'],
      duration: '4n',
      timing: 5,
      instrumentType: 'melody',
    },
    // A minor
    Am: {
      names: ['A4', 'C5', 'E5'],
      duration: '4n',
      timing: 6,
      instrumentType: 'melody',
    },
    // E minor
    Em: {
      names: ['E4', 'G4', 'B4'],
      duration: '4n',
      timing: 7,
      instrumentType: 'melody',
    },
    // B minor
    Bm: {
      names: ['B4', 'D5', 'F#5'],
      duration: '4n',
      timing: 8,
      instrumentType: 'melody',
    },
    // F# minor
    'F#m': {
      names: ['F#4', 'A4', 'C#5'],
      duration: '4n',
      timing: 9,
      instrumentType: 'melody',
    },
    // C# minor
    'C#m': {
      names: ['C#4', 'E4', 'G#4'],
      duration: '4n',
      timing: 10,
      instrumentType: 'melody',
    },
    // G# minor
    'G#m': {
      names: ['G#4', 'B4', 'D#5'],
      duration: '4n',
      timing: 11,
      instrumentType: 'melody',
    },
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
        console.log('릴레이 스튜디오 소환 에러:', error);
      }
    );
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const pianoSampler = new Tone.Sampler({
      urls: {
        C4: 'C4.mp3',
        C5: 'C5.mp3',
        'D#4': 'Ds4.mp3',
        'D#5': 'Ds5.mp3',
        'F#4': 'Fs4.mp3',
        'F#5': 'Fs5.mp3',
        A4: 'A4.mp3',
        A5: 'A5.mp3',
      },
      release: 1,
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
    }).toDestination();

    // const synth = new Tone.MembraneSynth().toDestination();

    const casioSampler = new Tone.Sampler({
      urls: {
        A1: 'A1.mp3',
        A2: 'A2.mp3',
        'A#2': 'As1.mp3',
      },
      baseUrl: 'https://tonejs.github.io/audio/casio/',
    }).toDestination();

    const kickPlayer = new Tone.Player({
      url: 'https://tonejs.github.io/audio/drum-samples/CR78/kick.mp3',
      volume: +3,
      autostart: false,
    }).toDestination();

    const snarePlayer = new Tone.Player({
      url: 'https://tonejs.github.io/audio/drum-samples/CR78/snare.mp3',
      autostart: false,
    }).toDestination();

    Tone.loaded().then(() => {
      if (!isCancelled) {
        setInstrumentInstances({
          piano: pianoSampler,
          casio: casioSampler,
          drum: {
            kick: kickPlayer,
            snare: snarePlayer,
          },
        });
      }
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const updateNote = useCallback(
    (name: string, timing: number | undefined) => {
      if (timing !== undefined) {
        setNotes((prevNotes) => {
          let isExistingNote = false;
          let updatedNotes = prevNotes.map((note) => {
            // 같은 타이밍의 노트 명단이 있다면
            if (note.timing === timing && note.instrumentType === 'melody') {
              isExistingNote = true;
              // 노트 명단에 입력하는 노트가 있다면
              if (note.names.includes(name)) {
                return {
                  // 빼주고
                  ...note,
                  names: (note.names as string[]).filter((n) => n !== name),
                };
              }
              // 아니면 더해준다
              return { ...note, names: [...(note.names as string[]), name] };
            }
            return note;
          });
          // 같은 타이밍의 노트 명단이 없는데 입력하는 노트가 없다면
          if (!isExistingNote) {
            // 해당 타이밍의 새로운 노트 명단을 만들어준다
            updatedNotes = [
              ...updatedNotes,
              {
                names: [name],
                duration: '8n',
                timing,
                instrumentType: 'melody',
              },
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

  const updateDrum = useCallback(
    (name: string, timing: number | undefined) => {
      if (timing !== undefined) {
        setNotes((prevNotes) => {
          // 만약 이전의 노트에 해당 이름과 타이밍의 노트가 있다면
          if (
            prevNotes.some(
              (note) => note.names === name && note.timing === timing
            )
          ) {
            // 제거
            return prevNotes.filter(
              (note) => note.names !== name || note.timing !== timing
            );
          }
          // 없다면 추가
          return [
            ...prevNotes,
            { names: name, duration: '8n', timing, instrumentType: 'beat' },
          ];
        });
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
    const timings = notes
      .filter((note) => note.instrumentType === 'melody')
      .map((note) => note.timing);
    // 그 배열중에 현재 배열에 notes에 없는 첫번째 타이밍값 리턴
    return possibleNoteTiming.find((num) => !timings.includes(num));
  };

  const findChordInputTiming = () => {
    const possibleNoteTiming = Array.from({ length: 160 }, (_, i) => i * 0.25);
    const timings = notes.map((note) => note.timing);
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

  const playNote = (noteName: string | string[]) => {
    const instrumentInstance =
      instrumentInstances[currentInstrument as 'piano' | 'casio'];
    if (instrumentInstance) {
      instrumentInstance.triggerAttackRelease(noteName, '8n');
    }
  };

  const playDrum = useCallback(
    (beatPower: 'weak' | 'strong', drumType: 'kick' | 'snare') => {
      console.log(beatPower, drumType);
      if (instrumentInstances.drum) {
        const drumInstance = (
          instrumentInstances.drum as {
            [key: string]: Tone.Player;
          }
        )[drumType];
        drumInstance.start();
      }
    },
    [instrumentInstances]
  );

  const clearNotes = useCallback(() => {
    setNotes([]);
  }, [setNotes]);

  const addChord = (chord: Chord) => {
    const timing = findChordInputTiming();
    if (timing) {
      const note = chordNotes[chord];
      setNotes((prevNote) => {
        return [
          ...prevNote,
          {
            names: note.names,
            duration: '8n',
            timing,
            instrumentType: 'melody',
          },
        ];
      });
    }
  };

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

  return (
    <>
      <StudioHeader
        studioInfo={studioInfo}
        notes={notes}
        instrumentInstances={instrumentInstances}
        currentInstrument={currentInstrument}
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
            updateDrum={updateDrum}
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
          <div>
            <StudioChord />
          </div>
        </div>
      </div>
    </>
  );
};

export default RelayStudioTemplate;
