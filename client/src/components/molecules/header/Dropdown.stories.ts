import type { Meta, StoryObj } from '@storybook/react';

import Dropdown from './Dropdown';

const meta = {
  title: 'molecule/Common/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IsShowed: Story = {
  args: { isShowed: true },
};
export const IsHidden: Story = {
  args: {},
};
