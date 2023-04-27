import type { Meta, StoryObj } from '@storybook/react';

import Profile from './Profile';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'molecule/ProfileSection/Profile',
  component: Profile,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof Profile>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    nickName: '두현',
    imageUrl: 'https://file.mk.co.kr/mkde/N0/2016/03/201603080305561821779.jpg',
  },
};
