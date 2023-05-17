import React, { useState, useEffect, useCallback, useRef } from 'react';
// 컴포넌트 import
import AlbumCard from 'components/molecules/albumcard/AlbumCard';
// axios return 값 타입 정의 import
import Album from 'types/Album';
// grid import
import { Container, Row, Col } from 'react-grid-system';
// SCSS import
import './AlbumCardsGrid.scss';
import * as Tone from 'tone';
import { Note } from 'types/Note';

interface AlbumCardsGridProps {
  AlbumCards: Album[];
}

const AlbumCardsGrid = ({ AlbumCards }: AlbumCardsGridProps) => {
  // 로딩 여부 관리
  // const [isLoading, setIsLoading] = useState(false);

  // 무한 스크롤用 변수들 관리
  const [visibleData, setVisibleData] = useState<Album[]>([]);
  const [page, setPage] = useState(1);

  // useState에 제네릭으로 number만 넣을 수 있도록 타입을 제한함
  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };
  // 반응형 useEffect
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // AlbumCards가 값이 변했을 때, 즉 값이 들어왔을 때 카드 리스트 4개까지 받기
  useEffect(() => {
    setVisibleData(AlbumCards.slice(0, 4));
  }, [AlbumCards]);

  // 스크롤이 아래로 갔고 && 보여줄 데이터의 길이가 전체 데이터 길이보다 짧다면
  // 보여줄 데이터의 길이를 추가
  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight &&
      visibleData.length < AlbumCards.length
    ) {
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * 4;
      const endIndex = startIndex + 4;
      const newVisibleItems = AlbumCards.slice(startIndex, endIndex);
      setPage(nextPage);
      setVisibleData((prevData) => [...prevData, ...newVisibleItems]);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [visibleData, page, AlbumCards]);

  const [instrumentInstances, setInstrumentInstances] = useState<{
    piano: Tone.Sampler | null;
    casio: Tone.Sampler | null;
    drum: { [key: string]: Tone.Player } | null; // 수정된 부분
  }>({
    piano: null,
    casio: null,
    drum: null,
  });

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

  const playAlbumNote = useCallback(
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
    },
    [instrumentInstances]
  );
  const sequenceRef = useRef<Tone.Part | null>(null);
  const playingBarTasksRef = useRef<NodeJS.Timeout[]>([]);

  const stopAlbumMusic = useCallback(() => {
    sequenceRef.current?.stop();
    Tone.Transport.stop();
    playingBarTasksRef.current.forEach(clearTimeout);
    playingBarTasksRef.current = [];
  }, []);

  const playAlbumMusic = useCallback(
    async (notes: Note[]) => {
      stopAlbumMusic();
      if (sequenceRef.current) {
        sequenceRef.current.stop();
        sequenceRef.current.dispose();
      }
      sequenceRef.current = new Tone.Part(
        playAlbumNote,
        notes.map((note) => [note.timing, note])
      ).start(0);

      if (Tone.Transport.state !== 'started') {
        await Tone.start();
        Tone.Transport.start();
      }
    },
    [visibleData]
  );
  // ========================================================================
  // ===============================(  렌 더 링  )============================
  // ========================================================================
  return (
    <div
      className="cards__container"
      style={{ width: `${width >= 1200 ? '1000px' : '100%'}` }}
    >
      <Container>
        <Row
          style={{
            width: `${width >= 992 ? '100%' : '500px'}`,
          }}
        >
          {visibleData.map((album) => {
            const notes: Note[] = JSON.parse(album.mp3Url);
            return (
              <Col sm={12} md={12} lg={6} key={album.albumId}>
                <AlbumCard
                  imgPath={album.albumUrl}
                  albumTitle={album.albumTitle}
                  albumStudio={album.nickName}
                  mp3Url={album.mp3Url}
                  like={album.userLike}
                  tags={album.tags}
                  albumInfo={album.albumContent}
                  playAlbumMusic={() => playAlbumMusic(notes)}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default AlbumCardsGrid;
