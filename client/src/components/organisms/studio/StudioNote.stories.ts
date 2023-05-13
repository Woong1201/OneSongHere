import type { Meta, StoryObj } from '@storybook/react';

import StudioNote from './StudioNote';

const meta = {
  title: 'organism/Studio/StudioNote',
  component: StudioNote,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    scrollPosition: 0,
    notes: [
      { names: ['C4'], duration: '8n', timing: 0 },
      { names: ['D#4', 'E4'], duration: '8n', timing: 0 },
      { names: ['C4'], duration: '8n', timing: 0 },
      { names: ['음계'], duration: '8n', timing: 0 },
    ],
    noteColumnStyle: Array(160).fill(false),
  },
};
