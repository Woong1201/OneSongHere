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
      { names: ['D#5'], duration: '8n', timing: 0.25 },
      { names: ['B4'], duration: '8n', timing: 1.25 },
      { names: ['E5'], duration: '8n', timing: 0.5 },
      { names: ['D#5'], duration: '8n', timing: 0.75 },
      { names: ['Eb4', 'G4', 'Bb4'], duration: '8n', timing: 1 },
    ],
    instrumentInstances: {
      piano: null,
      casio: null,
      bongo: null,
    },
    currentInstrument: 'piano',
  },
};
