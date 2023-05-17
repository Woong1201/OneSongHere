import type { Meta, StoryObj } from '@storybook/react';

import Button from './Button';

const meta = {
  title: 'atom/Common/Button',
  component: Button,
  tags: ['autodocs'],
  // argTypes: {
  //   backgroundColor: { control: 'color' },
  // },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    type: 'button',
    tag: true,
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    type: 'button',
    tag: false,
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    type: 'button',
    color: 'primary',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    type: 'button',
    color: 'other',
    label: 'Button',
  },
};
