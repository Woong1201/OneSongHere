import type { Meta, StoryObj } from '@storybook/react';

import HamburgerIcon from './HamburgerIcon';

const meta = {
  title: 'atom/Common/HamburgerIcon',
  component: HamburgerIcon,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof HamburgerIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
