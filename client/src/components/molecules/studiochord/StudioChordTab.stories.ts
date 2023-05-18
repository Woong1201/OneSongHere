import type { Meta, StoryObj } from '@storybook/react';

import StudioChordTab from './StudioChordTab';

const meta = {
  title: 'molecule/StudioChord/StudioChordTab',
  component: StudioChordTab,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioChordTab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { currentTab: 1, tabId: 1 },
};
