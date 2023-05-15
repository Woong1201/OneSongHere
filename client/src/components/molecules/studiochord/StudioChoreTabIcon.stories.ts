import type { Meta, StoryObj } from '@storybook/react';

import StudioChoreTabIcon from './StudioChoreTabIcon';

const meta = {
  title: 'atom/StudioChord/StudioChoreTabIcon',
  component: StudioChoreTabIcon,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioChoreTabIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
