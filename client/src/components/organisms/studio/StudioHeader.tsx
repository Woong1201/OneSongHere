import React from 'react';
import './StudioHeader.scss';
import ProfileImageList from 'components/molecules/studioheader/ProfileImageList';
import StudioControll from 'components/molecules/studioheader/StudioControll';
import StudioTitle from 'components/molecules/studioheader/StudioTitle';
import StudioMenu from 'components/molecules/studioheader/StudioMenu';
import User from 'types/User';
import { Note } from 'types/Note';
import * as Tone from 'tone';

interface StudioHeaderProps {
  notes: Note[];
  pianoInstance: Tone.Sampler | null;
  changePlayingStyle: (timing: number) => void;
  revertPlayingStyle: (timing: number) => void;
  setNoteColumnStyle: React.Dispatch<React.SetStateAction<boolean[]>>;
  clearNotes: () => void;
}
const StudioHeader = ({
  notes,
  pianoInstance,
  changePlayingStyle,
  revertPlayingStyle,
  setNoteColumnStyle,
  clearNotes,
}: StudioHeaderProps) => {
  const users: User[] = [
    {
      userId: 1,
      nickname: '신선호',
      picture:
        'https://file.mk.co.kr/mkde/N0/2016/03/201603080305561821779.jpg',
    },
    {
      userId: 2,
      nickname: '김태연',
      picture:
        'https://file.mk.co.kr/meet/neds/2023/03/image_readtop_2023_195678_16786077015385435.jpg',
    },
    {
      userId: 3,
      nickname: '김영웅',
      picture: 'https://slamdunk-movie.jp/files/images/p_main_akagi.jpg',
    },
  ];

  return (
    <div className="studio__header">
      <StudioControll
        notes={notes}
        pianoInstance={pianoInstance}
        changePlayingStyle={changePlayingStyle}
        revertPlayingStyle={revertPlayingStyle}
        setNoteColumnStyle={setNoteColumnStyle}
        clearNotes={clearNotes}
      />
      <StudioTitle />
      <ProfileImageList users={users} />
      <StudioMenu />
    </div>
  );
};

export default StudioHeader;
