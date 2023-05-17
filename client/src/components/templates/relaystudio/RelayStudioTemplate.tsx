import StudioHeader from 'components/organisms/studio/StudioHeader';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './RelayStudioTemplate.scss';
import StudioNote from 'components/organisms/studio/StudioNote';
import StudioInstrument from 'components/organisms/studio/StudioInstrument';
import StudioCam from 'components/organisms/studio/StudioCam';
import { useParams } from 'react-router-dom';
import { Note } from 'types/Note';
import { Chord, ChordValue } from 'types/Chord';
import { RelayStudioInfo } from 'types/RelayStudio';
import * as Tone from 'tone';
import { getRelayStudioInfo, postRelayNotes } from 'services/relayStudio';
import StudioChord from 'components/organisms/studio/StudioChord';
import Vote from 'components/organisms/vote/Vote';

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
  const [userNum, setUserNum] = useState<number>(0);
  const [barNum, setBarNum] = useState<number>(0);
  const [userOrder, setUserOrder] = useState<number>(0);
  const [columnNum, setColumnNum] = useState<number>(160);

  const startDisableTiming = useMemo(
    () => barNum * 0.25 * (userOrder - 1),
    [userOrder]
  );
  const timingDisabled = (timing: number) => {
    return (
      startDisableTiming > timing ||
      startDisableTiming + barNum * 0.25 <= timing
    );
  };
  console.log(startDisableTiming);
  const [noteColumnStyle, setNoteColumnStyle] = useState(
    Array(160).fill(false)
  );
  useEffect(() => {
    if (studioInfo) {
      setUserNum(studioInfo.limitOfUsers as number);
      setBarNum(studioInfo.numberOfBars as number);
      setUserOrder((studioInfo.numberOfUsers as number) + 1);
    }
  }, [studioInfo]);

  useEffect(() => {
    if (studioInfo) {
      setColumnNum((userNum + 1) * barNum);
      setNoteColumnStyle(Array((userNum + 1) * barNum).fill(false));
    }
  }, [userNum]);

  const [noteScrollPosition, setNoteScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const updateNoteScrollPosition = (position: number) => {
    setNoteScrollPosition(position);
  };

  const chordNotes: Record<Chord, ChordValue> = {
    // C Major
    C: {
      notes: ['C4', 'E4', 'G4'],
      name: 'C Major',
    },
    // G Major
    G: {
      notes: ['G4', 'B4', 'D5'],
      name: 'G Major',
    },
    // D Major
    D: {
      notes: ['D4', 'F#4', 'A4'],
      name: 'D Major',
    },
    // A Major
    A: {
      notes: ['A4', 'C#5', 'E5'],
      name: 'A Major',
    },
    // E Major
    E: {
      notes: ['E4', 'G#4', 'B4'],
      name: 'E Major',
    },
    // B Major
    B: {
      notes: ['B4', 'D#5', 'F#5'],
      name: 'B Major',
    },
    // A minor
    Am: {
      notes: ['A4', 'C5', 'E5'],
      name: 'A minor',
    },
    // E minor
    Em: {
      notes: ['E4', 'G4', 'B4'],
      name: 'E minor',
    },
    // B minor
    Bm: {
      notes: ['B4', 'D5', 'F#5'],
      name: 'B minor',
    },
    // F# minor
    'F#m': {
      notes: ['F#4', 'A4', 'C#5'],
      name: 'F# minor',
    },
    // C# minor
    'C#m': {
      notes: ['C#4', 'E4', 'G#4'],
      name: 'C# minor',
    },
    // G# minor
    'G#m': {
      notes: ['G#4', 'B4', 'D#5'],
      name: 'G# minor',
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
          if (relayStudioSheet === '') {
            setNotes([]);
          } else {
            setNotes(JSON.parse(relayStudioSheet));
          }
        }
      },
      (error) => {
        console.log('릴레이 스튜디오 소환 에러:', error);
      }
    );
  }, []);
  console.log('notes:', notes);
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
  // console.log(1195);
  const inputScroll = (inputTiming: number) => {
    const updatedNotePosition = inputTiming * 4 * 35;
    setNoteScrollPosition((prevPosition) => {
      if (
        updatedNotePosition < prevPosition ||
        updatedNotePosition > 1195 + prevPosition
      ) {
        return Math.max(updatedNotePosition - 50, 0);
      }
      return prevPosition;
    });
  };

  const updateNote = (name: string, timing: number | undefined) => {
    if (timing !== undefined && !timingDisabled(timing)) {
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
      inputScroll(timing);
    }
  };

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
        inputScroll(timing);
      }
    },
    [noteScrollPosition]
  );

  const findInputTiming = () => {
    // 0부터 0.25 * 150까지 배열
    const possibleNoteTiming = Array.from(
      { length: columnNum },
      (_, i) => i * 0.25
    );
    // 현재 타이밍들
    const timings = notes
      .filter((note) => note.instrumentType === 'melody')
      .map((note) => note.timing);
    // 그 배열중에 현재 배열에 notes에 없는 첫번째 타이밍값 리턴
    return possibleNoteTiming.find((num) => !timings.includes(num));
  };

  // const findChordInputTiming = () => {
  //   const possibleNoteTiming = Array.from({ length: columnNum }, (_, i) => i * 0.25);
  //   const timings = notes.map((note) => note.timing);
  //   return possibleNoteTiming.find((num) => !timings.includes(num));
  // };

  const findLastTiming = () => {
    return notes.length > 0
      ? notes.reduce((lastNote, currentNote) => {
          return currentNote.timing > lastNote.timing ? currentNote : lastNote;
        }).timing
      : 0;
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

  const updateChord = (chord: Chord) => {
    const timing = findInputTiming();
    const note = chordNotes[chord];
    if (timing !== undefined && !timingDisabled(timing)) {
      setNotes((prevNote) => {
        return [
          ...prevNote,
          {
            names: note.notes,
            timing,
            duration: '8n',
            instrumentType: 'melody',
          },
        ];
      });
      inputScroll(timing);
    }
    playNote(note.notes);
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
  console.log(studioInfo?.numberOfUsers);

  const updateStudioInfo = (newStudioInfo: RelayStudioInfo) => {
    setStudioInfo(newStudioInfo);
  };

  const submitRelayNotes = () => {
    const relayStudioID = numRelayStudioId;
    const stringNote = JSON.stringify(notes);
    const complete = true;
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
        submitNotes={submitRelayNotes}
        inputScroll={inputScroll}
        findLastTiming={findLastTiming}
        columnNum={columnNum}
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
            columnNum={columnNum}
            containerWidth={containerWidth}
            setContainerWidth={setContainerWidth}
            userOrder={userOrder}
            barNum={barNum}
          />
          <StudioInstrument
            updateNote={updateNote}
            findInputTiming={findInputTiming}
            playNote={playNote}
          />
        </div>
        <div className="relay-studio__side">
          {studioInfo && (
            <Vote
              updateStudioInfo={updateStudioInfo}
              currentId={studioInfo.userId}
              vote={studioInfo.vote}
              status={studioInfo.status}
              agree={studioInfo.agree}
              numberOfVotes={studioInfo.numberOfVotes}
              relayStudioId={studioInfo.relayStudioID}
            />
          )}
          <StudioChord chordNotes={chordNotes} updateChord={updateChord} />
        </div>
      </div>
    </>
  );
};

export default RelayStudioTemplate;
