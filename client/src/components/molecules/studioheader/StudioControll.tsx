import React from 'react';
import './StudioControll.scss';
import LogoIcon from 'components/atoms/common/LogoIcon';
import PlayIcon from 'components/atoms/stuidioHeader/PlayIcon';

import StopIcon from 'components/atoms/stuidioHeader/StopIcon';

import * as Tone from 'tone';
import Note from 'types/Note';

interface StudioControllProps {
  notes: Note[];
}

const StudioControll = ({ notes }: StudioControllProps) => {
  // 시퀀스 재생 메소드
  const playSequence = () => {
    // Tone의 Sampler로 피아노 파일 인스턴스를 만듭니다
    const piano = new Tone.Sampler({
      urls: {
        C4: 'C4.mp3',
        'D#4': 'Ds4.mp3',
        'F#4': 'Fs4.mp3',
        A4: 'A4.mp3',
      },
      release: 1,
      baseUrl: 'https://tonejs.github.io/audio/salamander/',
    }).toDestination();
    // Tone이 로드된 후
    Tone.loaded().then(() => {
      // Notes 데이터에 각 노트들
      notes.forEach((note) => {
        const now = Tone.now();
        // triggerAttackRelease로 재생해줍니다 노트, 지속시간, 타이밍
        piano.triggerAttackRelease(
          note.names,
          note.duration,
          now + note.timing
        );
      });
    });
  };

  const stopSequence = () => {
    Tone.Transport.stop();
  };

  return (
    <div className="studio__header-controll">
      <LogoIcon goHome size="small" whiteMode />
      <button
        type="button"
        onClick={playSequence}
        className="studio__header-controll-icon"
      >
        <PlayIcon size={30} />
      </button>
      {/* <button
        type="button"
        onClick={stopSequence}
        className="studio__header-controll-icon"
      >
        <StopIcon size={30} />
      </button> */}
    </div>
  );
};

export default StudioControll;
