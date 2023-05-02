import type { Meta, StoryObj } from '@storybook/react';

import MainGuide from './MainGuide';

const meta = {
  title: 'molecule/Main/MainGuide',
  component: MainGuide,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof MainGuide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
