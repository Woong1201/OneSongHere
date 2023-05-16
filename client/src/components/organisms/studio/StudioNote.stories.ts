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
      { names: ['C4'], duration: '8n', timing: 0, instrumentType: 'melody' },
      {
        names: ['D#4', 'E4'],
        duration: '8n',
        timing: 0,
        instrumentType: 'melody',
      },
      { names: ['C4'], duration: '8n', timing: 0, instrumentType: 'melody' },
      { names: ['kick'], duration: '8n', timing: 0, instrumentType: 'beat' },
    ],
    noteColumnStyle: Array(160).fill(false),
    columnNum: 160,
  },
};
