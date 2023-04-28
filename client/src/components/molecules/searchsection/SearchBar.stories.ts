import type { Meta, StoryObj } from '@storybook/react';

import SearchBar from './SearchBar';

const meta = {
  title: 'molecule/SearchSection/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: '검색어를 입력해주세요.',
  },
};
