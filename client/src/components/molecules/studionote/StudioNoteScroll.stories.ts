import type { Meta, StoryObj } from '@storybook/react';

import StudioNoteScroll from './StudioNoteScroll';

const meta = {
  title: 'molecule/StudioNote/StudioNoteScroll',
  component: StudioNoteScroll,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioNoteScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
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
    scrollPosition: 1,
    updateScrollPosition: (position) => console.log(position),
    noteColumnStyle: Array(160).fill(false),
    columnNum: 160,
    containerWidth: 100,
    userOrder: 0,
    gridWidth: 100,
    barNum: 1,
    studioStatus: 2,
    currentUserId: 0,
    currentComposerId: 0,
  },
};
