import type { Meta, StoryObj } from '@storybook/react';

import ArticleHeader from './ArticleHeader';

const meta = {
  title: 'molecule/ArticleHeader/ArticleHeader',
  component: ArticleHeader,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof ArticleHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
