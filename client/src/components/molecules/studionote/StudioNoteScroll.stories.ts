import type { Meta, StoryObj } from '@storybook/react';

import StudioNoteScroll from './StudioNoteScroll';

const meta = {
  title: 'molecule/StudioNote/StudioNoteScroll',
  component: StudioNoteScroll,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioNoteScroll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    scrollPosition: 1,
    updateScrollPosition: (position) => console.log(position),
    pianoInstance: null,
  },
};
