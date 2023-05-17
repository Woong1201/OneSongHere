import type { Meta, StoryObj } from '@storybook/react';

import StudioNoteItem from './StudioNoteItem';

const meta = {
  title: 'atom/StudioNote/StudioNoteItem',
  component: StudioNoteItem,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioNoteItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    timing: 0,
    note: 'D4',
    selected: true,
  },
};
