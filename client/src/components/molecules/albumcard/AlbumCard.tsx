import React, { useState, useEffect, useCallback, useRef } from 'react';
// scss import
import './AlbumCard.scss';
// atom import
import CardTitle from 'components/atoms/common/CardTitle';
import Chip from 'components/atoms/common/Chip';
import LikeHeart from 'components/atoms/likeheart/LikeHeart';
import AlbumImage from 'components/atoms/albumimage/AlbumImage';
import AlbumPlayButton from 'components/atoms/albumimage/AlbumPlayButton';
import * as Tone from 'tone';
import { Note } from 'types/Note';

interface AlbumCardProps {
  //   작품 앨범 커버
  imgPath: string;
  //   작품 앨범 타이틀
  albumTitle: string;
  //   작업 스튜디오 이름
  albumStudio: string;
  // 곡 url or 노트 오브젝트
  mp3Url: string;
  //   좋아요 클릭 여부
  like: boolean;
  //   태그 장르명
  tags: string[];
  //   작품 앨범 정보
  albumInfo: string;
}

const AlbumCard = ({
  imgPath,
  albumTitle,
  albumStudio,
  mp3Url,
  like,
  tags,
  albumInfo,
}: AlbumCardProps) => {
  // useState에 제네릭으로 number만 넣을 수 있도록 타입을 제한함
  const [width, setWidth] = useState<number>(window.innerWidth);
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

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
  // if (mp3Url === '') {
  //   console.log([]);
  // } else {
  //   console.log(JSON.parse(mp3Url));
  // }
  console.log(mp3Url);
  console.log(JSON.parse(mp3Url));
  const notes: Note[] = JSON.parse(mp3Url);
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

  const playAlbumMusic = useCallback(() => {
    if (Tone.Transport.state === 'started') {
      stopAlbumMusic();
    }

    sequenceRef.current = new Tone.Part(
      playAlbumNote,
      notes.map((note) => [note.timing, note])
    );

    sequenceRef.current?.start();
    Tone.Transport.start();
  }, [notes]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderTags = () => {
    if (Array.isArray(tags)) {
      return tags.map((item) => <Chip key={item} label={item} size="small" />);
    }
    return <Chip label={tags} size="small" />;
  };

  // const playMusic = () => {};
  return (
    <div
      className="album-card"
      style={{ width: `${width >= 768 ? '440px' : '440px'}` }}
    >
      {/* 사진 영역 */}
      <div className="album-card__cover-box">
        {/* <div className="album-card__cover-frame"> */}
        <AlbumImage imageUrl={imgPath} size="large" />
        {/* </div> */}
        <AlbumPlayButton />
      </div>
      {/* 정보 영역 */}
      <div className="album-card__info-box">
        <div>
          <CardTitle title={albumTitle} maxWidth={180} />
        </div>
        <div className="album-card__info-studio-like">
          <div className="album-card__info-studio">{albumStudio}</div>
          <LikeHeart isPushed={like} />
        </div>
        <div>{renderTags()}</div>
        <div className="album-card__info-album-info">{albumInfo}</div>
      </div>
    </div>
  );
};

export default AlbumCard;
