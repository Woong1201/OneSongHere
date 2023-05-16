import type { Meta, StoryObj } from '@storybook/react';

import StudioChordCard from './StudioChordCard';

const meta = {
  title: 'molecule/StudioChord/StudioChordCard',
  component: StudioChordCard,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioChordCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    chordName: 'C Major',
    noteNames: ['C4', 'E4', 'G4'],
  },
};
