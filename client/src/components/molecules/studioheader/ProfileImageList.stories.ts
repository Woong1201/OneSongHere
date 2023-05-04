import type { Meta, StoryObj } from '@storybook/react';

import ProfileImageList from './ProfileImageList';

const meta = {
  title: 'molecule/StudioHeader/ProfileImageList',
  component: ProfileImageList,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof ProfileImageList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    users: [
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
    ],
  },
};
