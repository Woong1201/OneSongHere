import type { Meta, StoryObj } from '@storybook/react';

import StudioNoteContainer from 'components/molecules/studionote/StudioNoteContainer';

const meta = {
  title: 'molecule/StudioNote/StudioNoteContainer',
  component: StudioNoteContainer,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioNoteContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    scrollPosition: 1,
    updateScrollPosition: (position) => console.log(position),
  },
};
