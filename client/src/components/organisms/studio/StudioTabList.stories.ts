import type { Meta, StoryObj } from '@storybook/react';

import StudioTabList from './StudioTabList';

const meta = {
  title: 'organism/Studio/StudioTabList',
  component: StudioTabList,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioTabList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    currentTab: 1,
  },
};
