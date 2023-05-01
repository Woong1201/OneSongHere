import type { Meta, StoryObj } from '@storybook/react';

import Header from './Header';

const meta = {
  title: 'molecule/Common/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoggedIn: Story = {
  args: {
    user: {
      userId: 1,
      nickname: '두현',
      picture:
        'https://file.mk.co.kr/mkde/N0/2016/03/201603080305561821779.jpg',
    },
  },
};
export const LoggedOut: Story = {
  args: {},
};
