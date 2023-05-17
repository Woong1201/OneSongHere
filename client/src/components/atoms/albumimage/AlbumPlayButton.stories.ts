import type { Meta, StoryObj } from '@storybook/react';

import AlbumPlayButton from './AlbumPlayButton';

const meta = {
  title: 'atom/Album/AlbumPlayButton',
  component: AlbumPlayButton,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof AlbumPlayButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
