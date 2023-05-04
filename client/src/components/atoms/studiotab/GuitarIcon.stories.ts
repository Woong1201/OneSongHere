import type { Meta, StoryObj } from '@storybook/react';

import GuitarIcon from './GuitarIcon';

const meta = {
  title: 'atom/StudioTab/GuitarIcon',
  component: GuitarIcon,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof GuitarIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
