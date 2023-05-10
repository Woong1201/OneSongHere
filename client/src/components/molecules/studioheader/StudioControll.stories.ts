import type { Meta, StoryObj } from '@storybook/react';

import StudioControll from './StudioControll';

const meta = {
  title: 'molecule/StudioHeader/StudioControll',
  component: StudioControll,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioControll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    notes: [
      { note: ['D#5'], duration: '8n', timing: 0.25 },
      { note: ['B4'], duration: '8n', timing: 1.25 },
      { note: ['E5'], duration: '8n', timing: 0.5 },
      { note: ['D#5'], duration: '8n', timing: 0.75 },
      { note: ['Eb4', 'G4', 'Bb4'], duration: '8n', timing: 1 },
    ],
  },
};
