import type { Meta, StoryObj } from '@storybook/react';

import StudioChordTitle from './StudioChordTitle';

const meta = {
  title: 'atom/StudioChord/StudioChordTitle',
  component: StudioChordTitle,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioChordTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  args: {
    chord: 'C',
  },
};
