import type { Meta, StoryObj } from '@storybook/react';

import AlbumImage from './AlbumImage';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'atom/Album/Image',
  component: AlbumImage,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof AlbumImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    imageUrl:
      'https://images.immediate.co.uk/production/volatile/sites/30/2013/05/christmas-ham-8555f14.jpg?quality=45&resize=960,872',
    size: 'medium',
  },
};
