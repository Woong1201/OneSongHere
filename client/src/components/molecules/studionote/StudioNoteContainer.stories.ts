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
    notes: [{ names: ['q'], duration: '8n', timing: 0 }],
    scrollPosition: 1,
    pianoInstance: null,
    updateScrollPosition: (position) => console.log(position),
  },
};
