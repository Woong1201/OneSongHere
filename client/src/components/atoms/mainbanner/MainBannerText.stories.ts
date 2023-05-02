import type { Meta, StoryObj } from '@storybook/react';

import MainBannerText from './MainBannerText';

const meta = {
  title: 'atom/Main/BannerText',
  component: MainBannerText,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof MainBannerText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { content: ['나에게서 너로', '우리만의 음악 작곡 플랫폼'] },
};
