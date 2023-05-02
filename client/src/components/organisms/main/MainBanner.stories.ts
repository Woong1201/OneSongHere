import type { Meta, StoryObj } from '@storybook/react';

import MainBanner from './MainBanner';

const meta = {
  title: 'organism/main/MainBanner',
  component: MainBanner,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof MainBanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Promary: Story = {
  args: { content: ['나에게서 너로', '우리만의 음악 작곡 플랫폼'] },
};
