import type { Meta, StoryObj } from '@storybook/react';

import DropdownItem from './DropdownItem';

const meta = {
  title: 'atom/Dropdown/DropdownItem',
  component: DropdownItem,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof DropdownItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: '일반',
  },
};
