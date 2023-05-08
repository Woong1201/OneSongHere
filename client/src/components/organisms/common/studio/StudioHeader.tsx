import React from 'react';
import './StudioHeader.scss';
import ProfileImageList from 'components/molecules/studioheader/ProfileImageList';
import StudioControll from 'components/molecules/studioheader/StudioControll';
import StudioTitle from 'components/molecules/studioheader/StudioTitle';
import StudioMenu from 'components/molecules/studioheader/StudioMenu';

const StudioHeader = () => {
  const users = [
    {
      userId: 1,
      accessToken: '111',
      nickname: '신선호',
      picture:
        'https://file.mk.co.kr/mkde/N0/2016/03/201603080305561821779.jpg',
    },
    {
      userId: 2,
      accessToken: '111',
      nickname: '김태연',
      picture:
        'https://file.mk.co.kr/meet/neds/2023/03/image_readtop_2023_195678_16786077015385435.jpg',
    },
    {
      userId: 3,
      accessToken: '111',
      nickname: '김영웅',
      picture: 'https://slamdunk-movie.jp/files/images/p_main_akagi.jpg',
    },
  ];

  return (
    <div className="studio__header">
      <StudioControll />
      <StudioTitle />
      <ProfileImageList users={users} />
      <StudioMenu />
    </div>
  );
};

export default StudioHeader;
