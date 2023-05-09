import type { Meta, StoryObj } from '@storybook/react';

import StudioNote from './StudioNote';

const meta = {
  title: 'organism/Studio/StudioNote',
  component: StudioNote,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
