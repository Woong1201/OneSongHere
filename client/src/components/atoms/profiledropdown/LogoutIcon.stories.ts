import type { Meta, StoryObj } from '@storybook/react';

import LogoutIcon from './LogoutIcon';

const meta = {
  title: 'atom/ProfileDropdown/LogoutIcon',
  component: LogoutIcon,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof LogoutIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
