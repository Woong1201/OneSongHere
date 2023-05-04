import type { Meta, StoryObj } from '@storybook/react';

import StudioControll from './StudioControll';

const meta = {
  title: 'molecule/StudioHeader/StudioControll',
  component: StudioControll,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioControll>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
