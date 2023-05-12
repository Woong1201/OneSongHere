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
    picture:
      'https://assets.epicurious.com/photos/6334c4063ae423970d320621/4:3/w_2507,h_1880,c_limit/Baked_Ham-RECIPE.jpg',
    nickname: '향유고래',
    date: '2023.05.10',
  },
};
