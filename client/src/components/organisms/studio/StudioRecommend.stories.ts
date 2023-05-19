import type { Meta, StoryObj } from '@storybook/react';

import StudioRecommend from './StudioRecommend';

const meta = {
  title: 'organism/Studio/StudioRecommend',
  component: StudioRecommend,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioRecommend>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    myNotes: [],
    recommendedNotes: [],
  },
};
