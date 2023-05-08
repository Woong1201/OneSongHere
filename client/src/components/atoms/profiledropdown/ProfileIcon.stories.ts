import type { Meta, StoryObj } from '@storybook/react';

import ProfileIcon from './ProfileIcon';

const meta = {
  title: 'atom/ProfileDropdown/ProfileIcon',
  component: ProfileIcon,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof ProfileIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
