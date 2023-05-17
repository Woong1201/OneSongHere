import React, { useEffect, useState } from 'react';
import './StudioHeader.scss';
import ProfileImageList from 'components/molecules/studioheader/ProfileImageList';
import StudioControll from 'components/molecules/studioheader/StudioControll';
import StudioTitle from 'components/molecules/studioheader/StudioTitle';
import StudioMenu from 'components/molecules/studioheader/StudioMenu';
import User from 'types/User';
import { Note } from 'types/Note';
import { RelayStudioInfo } from 'types/RelayStudio';
import { useRecoilValue } from 'recoil';
import { UserState } from 'store/UserState';
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
  submitNotes: () => void;
  inputScroll: (inputTiming: number) => void;
  findLastTiming: () => number;
  columnNum: number;
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
  submitNotes,
  inputScroll,
  findLastTiming,
  columnNum,
}: StudioHeaderProps) => {
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUserId((JSON.parse(storedUser) as User).userId);
    }
  }, []);

  let studioTitle = '';

  if (studioInfo) {
    if ('relayStudioTitle' in studioInfo) {
      studioTitle = studioInfo.relayStudioTitle;
    } else if ('studioTitle' in studioInfo) {
      studioTitle = studioInfo.studioTitle;
    }
  }
  const user = useRecoilValue(UserState);
  const users = user ? [user] : [];

  // const users: User[] = [
  //   {
  //     userId: 1,
  //     nickname: '신선호',
  //     picture:
  //       'https://file.mk.co.kr/mkde/N0/2016/03/201603080305561821779.jpg',
  //   },
  //   {
  //     userId: 2,
  //     nickname: '김태연',
  //     picture:
  //       'https://file.mk.co.kr/meet/neds/2023/03/image_readtop_2023_195678_16786077015385435.jpg',
  //   },
  //   {
  //     userId: 3,
  //     nickname: '김영웅',
  //     picture: 'https://slamdunk-movie.jp/files/images/p_main_akagi.jpg',
  //   },
  // ];

  return (
    <div className="studio__header">
      <StudioControll
        notes={notes}
        instrumentInstances={instrumentInstances}
        // currentInstrument={currentInstrument}
        // changePlayingStyle={changePlayingStyle}
        // revertPlayingStyle={revertPlayingStyle}
        setNoteColumnStyle={setNoteColumnStyle}
        clearNotes={clearNotes}
        inputScroll={inputScroll}
        findLastTiming={findLastTiming}
        columnNum={columnNum}
      />
      <StudioTitle studioTitle={studioTitle} />
      <ProfileImageList users={users} />
      {studioInfo &&
        ((studioInfo as RelayStudioInfo).userId === userId ? (
          <StudioMenu
            status={(studioInfo as RelayStudioInfo).status}
            saveNotes={saveNotes}
            submitNotes={submitNotes}
          />
        ) : null)}
    </div>
  );
};

export default StudioHeader;
