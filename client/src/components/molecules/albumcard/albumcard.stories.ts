import type { Meta, StoryObj } from '@storybook/react';

import AlbumCard from 'components/molecules/albumcard/AlbumCard';

const meta = {
  title: 'molecule/AlbumCard/AlbumCard',
  component: AlbumCard,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof AlbumCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    imgPath:
      'https://hips.hearstapps.com/thepioneerwoman/wp-content/uploads/2013/03/ham3.jpg?crop=1xw:0.845763723150358xh;center,top',
    albumTitle: '그슬린 햄',
    albumStudio: '정육점',
    like: true,
    tag: '컨트리',
    albumInfo:
      '정육점에서 막 사온 햄을 바싹 구워먹는 상상을 담은 경쾌한 피아노 음색이 특징이다.',
  },
};
