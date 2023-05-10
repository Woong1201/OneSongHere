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
    notes: [
      { names: ['D#5'], duration: '8n', timing: 0.25 },
      { names: ['B4'], duration: '8n', timing: 1.25 },
      { names: ['E5'], duration: '8n', timing: 0.5 },
      { names: ['D#5'], duration: '8n', timing: 0.75 },
      { names: ['Eb4', 'G4', 'Bb4'], duration: '8n', timing: 1 },
    ],
  },
};
