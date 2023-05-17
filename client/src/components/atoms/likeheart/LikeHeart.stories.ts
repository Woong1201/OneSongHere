import type { Meta, StoryObj } from '@storybook/react';

import LikeHeart from './LikeHeart';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'atom/LikeHeart/LikeHeart',
  component: LikeHeart,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof LikeHeart>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    isPushed: true,
  },
};
