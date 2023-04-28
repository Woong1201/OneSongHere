import type { Meta, StoryObj } from '@storybook/react';

import { GenreButtonList } from './GenreButtonList';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'molecule/SearchSection/GenreButtonList',
  component: GenreButtonList,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof GenreButtonList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
};
