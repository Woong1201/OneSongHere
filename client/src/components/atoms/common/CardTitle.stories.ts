import type { Meta, StoryObj } from '@storybook/react';

import CardTitle from './CardTitle';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'atom/Common/CardTitle',
  component: CardTitle,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof CardTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    title: 'OneSongHere',
  },
};
