import type { Meta, StoryObj } from '@storybook/react';

import StudioChordText from './StudioChordText';

const meta = {
  title: 'atom/StudioChord/StudioChordText',
  component: StudioChordText,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioChordText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  args: {
    noteNames: ['C4', 'E4', 'G4'],
  },
};
