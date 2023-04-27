import type { Meta, StoryObj } from '@storybook/react';

import SectionTitle from './SectionTitle';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'atom/Common/SectionTitle',
  component: SectionTitle,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Page: Story = {
  args: {
    title: '스튜디오 페이지',
  },
};

export const Board: Story = {
  args: {
    title: '자랑 게시판',
  },
};
