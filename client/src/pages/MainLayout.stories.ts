import type { Meta, StoryObj } from '@storybook/react';

import MainLayout from './MainLayout';

const meta = {
  title: 'Page/main',
  component: MainLayout,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof MainLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
