import type { Meta, StoryObj } from '@storybook/react';

import BannerContent from './MainBannerContent';

const meta = {
  title: 'molecule/Main/MainBannerContent',
  component: BannerContent,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof BannerContent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { content: ['나에게서 너로', '우리만의 음악 작곡 플랫폼'] },
};
