import type { Meta, StoryObj } from '@storybook/react';

import StudioNoteGrid from 'components/molecules/studionote/StudioNoteGrid';

const meta = {
  title: 'molecule/StudioNote/StudioNoteGrid',
  component: StudioNoteGrid,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioNoteGrid>;

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
      { names: 'kick', duration: '8n', timing: 0, instrumentType: 'beat' },
    ],
    noteColumnStyle: Array(160).fill(false),
    columnNum: 160,
    userOrder: 0,
    barNum: 0,
    studioStatus: 1,
    currentUserId: 0,
    currentComposerId: 0,
  },
};
