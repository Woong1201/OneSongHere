import type { Meta, StoryObj } from '@storybook/react';

import StudioDrumItem from './StudioDrumItem';

const meta = {
  title: 'atom/StudioNote/StudioDrumItem',
  component: StudioDrumItem,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioDrumItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { selected: false },
};
