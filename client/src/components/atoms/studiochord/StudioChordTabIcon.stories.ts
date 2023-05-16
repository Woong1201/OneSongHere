import type { Meta, StoryObj } from '@storybook/react';

import StudioChordTabIcon from './StudioChordTabIcon';

const meta = {
  title: 'atom/StudioChord/StudioChordTabIcon',
  component: StudioChordTabIcon,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioChordTabIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
