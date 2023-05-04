import type { Meta, StoryObj } from '@storybook/react';

import StudioMenu from './StudioMenu';

const meta = {
  title: 'molecule/StudioHeader/StudioMenu',
  component: StudioMenu,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
