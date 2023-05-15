import type { Meta, StoryObj } from '@storybook/react';

import StudioChord from './StudioChord';

const meta = {
  title: 'organism/Studio/StudioChord',
  component: StudioChord,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioChord>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
