import type { Meta, StoryObj } from '@storybook/react';

import CommentInput from './CommentInput';

const meta = {
  title: 'molecule/CommentInput/CommentInput',
  component: CommentInput,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof CommentInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {
  args: { boardid: 1 },
};
