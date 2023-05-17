import type { Meta, StoryObj } from '@storybook/react';

import ProfileDropdownItem from './ProfileDropdownItem';
import ProfileIcon from './ProfileIcon';

const meta = {
  title: 'atom/ProfileDropdown/ProfileDropdownItem',
  component: ProfileDropdownItem,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof ProfileDropdownItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: '내 프로필', icon: '' },
};
