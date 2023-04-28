import type { Meta, StoryObj } from '@storybook/react';

import StudioCardDate from './StudioCardDate';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'atom/StudioCard/StudioCardDate',
  component: StudioCardDate,
  tags: ['autodocs'],
  argTypes: {
    startDate: {
      control: 'date',
    },
    endDate: {
      control: 'date',
    },
  },
} satisfies Meta<typeof StudioCardDate>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    startDate: new Date(2023, 3, 28),
    endDate: new Date(2023, 3, 29),
  },
};

export const Secondary: Story = {
  args: {
    startDate: new Date(2023, 4, 28),
    endDate: new Date(2023, 8, 29),
  },
};
