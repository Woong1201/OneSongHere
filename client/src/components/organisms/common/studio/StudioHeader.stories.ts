import type { Meta, StoryObj } from '@storybook/react';

import StudioHeader from './StudioHeader';

const meta = {
  title: 'organism/Studio/StudioHeader',
  component: StudioHeader,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
