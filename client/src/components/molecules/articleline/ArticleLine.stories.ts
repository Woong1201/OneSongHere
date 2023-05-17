import type { Meta, StoryObj } from '@storybook/react';

import ArticleLine from './ArticleLine';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'molecule/ArticleLine/ArticleLine',
  component: ArticleLine,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof ArticleLine>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Page: Story = {
  args: {
    boardId: 1121,
    userId: 2,
    nickName: '고짐고',
    boardTitle: '마지막 소절 하실 분?????',
    header: '구인',
    boardDate: '2023.04.14',
    isEmptyOutput: false,
  },
};
