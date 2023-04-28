import type { Meta, StoryObj } from '@storybook/react';

import Chip from './Chip';

const meta = {
  title: 'atom/Common/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const White: Story = {
  args: { primary: false, label: 'CHIP', backgroundColor: '#FFFFFF' },
};
export const StudioCard: Story = {
  args: { primary: false, label: '재즈', size: 'small' },
};
