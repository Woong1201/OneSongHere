import type { Meta, StoryObj } from '@storybook/react';

import StopIcon from './StopIcon';

const meta = {
  title: 'atom/StudioHeader/StopIcon',
  component: StopIcon,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StopIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
