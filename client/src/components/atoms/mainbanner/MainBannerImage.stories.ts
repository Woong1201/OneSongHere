import type { Meta, StoryObj } from '@storybook/react';

import MainBannerImage from './MainBannerImage';

const meta = {
  title: 'atom/MainBanner/BannerImage',
  component: MainBannerImage,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof MainBannerImage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {},
};
