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
  args: {
    header: '질문',
    title: '스튜디오 어떻게 쓰는건가요?',
    nickname: '향유고래',
    date: '2023.05.10',
  },
};
