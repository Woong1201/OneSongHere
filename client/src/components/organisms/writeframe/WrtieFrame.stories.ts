import type { Meta, StoryObj } from '@storybook/react';

import WriteFrame from './WriteFrame';

const meta = {
  title: 'organism/WriteFrame/WriteFrame',
  component: WriteFrame,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof WriteFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
