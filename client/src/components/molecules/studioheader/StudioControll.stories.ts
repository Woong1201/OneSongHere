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
    instrumentInstances: {
      piano: null,
      casio: null,
      drum: null,
    },
    // currentInstrument: 'piano',
    findLastTiming: () => 0,
    columnNum: 160,
  },
};
