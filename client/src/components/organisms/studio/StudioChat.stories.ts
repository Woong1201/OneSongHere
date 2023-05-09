import type { Meta, StoryObj } from '@storybook/react';

import StudioChat from './StudioChat';

const meta = {
  title: 'organism/Studio/StudioChat',
  component: StudioChat,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioChat>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
