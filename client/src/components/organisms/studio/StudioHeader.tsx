import React from 'react';
import './StudioHeader.scss';
import ProfileImageList from 'components/molecules/studioheader/ProfileImageList';
import StudioControll from 'components/molecules/studioheader/StudioControll';
import StudioTitle from 'components/molecules/studioheader/StudioTitle';
import StudioMenu from 'components/molecules/studioheader/StudioMenu';
import User from 'types/User';
import { Note } from 'types/Note';
import { RelayStudioInfo } from 'types/RelayStudio';
import { StudioInfo } from 'types/Studio';
import * as Tone from 'tone';

interface StudioHeaderProps {
  studioInfo: RelayStudioInfo | StudioInfo | undefined;
  notes: Note[];
  instrumentInstances: {
    piano: Tone.Sampler | null;
    casio: Tone.Sampler | null;
    drum: {
      [key: string]: Tone.Player;
    } | null;
  };
  currentInstrument: string;
  changePlayingStyle: (timing: number) => void;
  revertPlayingStyle: (timing: number) => void;
  setNoteColumnStyle: React.Dispatch<React.SetStateAction<boolean[]>>;
  clearNotes: () => void;
  saveNotes: () => void;
}
const StudioHeader = ({
  studioInfo,
  notes,
  instrumentInstances,
  currentInstrument,
  changePlayingStyle,
  revertPlayingStyle,
  setNoteColumnStyle,
  clearNotes,
  saveNotes,
}: StudioHeaderProps) => {
  let studioTitle = '';

  if (studioInfo) {
    if ('relayStudioTitle' in studioInfo) {
      studioTitle = studioInfo.relayStudioTitle;
    } else if ('studioTitle' in studioInfo) {
      studioTitle = studioInfo.studioTitle;
    }
  }

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
        instrumentInstances={instrumentInstances}
        currentInstrument={currentInstrument}
        changePlayingStyle={changePlayingStyle}
        revertPlayingStyle={revertPlayingStyle}
        setNoteColumnStyle={setNoteColumnStyle}
        clearNotes={clearNotes}
      />
      <StudioTitle studioTitle={studioTitle} />
      <ProfileImageList users={users} />
      <StudioMenu saveNotes={saveNotes} />
    </div>
  );
};

export default StudioHeader;
