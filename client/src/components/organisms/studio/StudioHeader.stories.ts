import type { Meta, StoryObj } from '@storybook/react';

import StudioHeader from './StudioHeader';

const meta = {
  title: 'organism/Studio/StudioHeader',
  component: StudioHeader,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    studioInfo: {
      relayStudioID: 1,
      relayStudioTitle: '제목입니다.',
      limitOfUsers: 6,
      numberOfBars: 4,
      relayStudioSheet: [],
      numberOfUsers: 4,
      endDate: new Date(2012, 10, 2),
      status: 4,
      userId: 1,
      participate: true,
      vote: true,
      tags: ['락', '발라드', '십덕'],
    },
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
    instrumentInstances: {
      piano: null,
      casio: null,
      bongo: null,
    },
    currentInstrument: 'piano',
  },
};
