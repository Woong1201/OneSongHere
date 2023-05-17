import type { Meta, StoryObj } from '@storybook/react';

import TransparencyText from 'components/atoms/transparencytext/TransparencyText';

const meta = {
  title: 'atom/TransparencyText/TransparenyText',
  component: TransparencyText,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof TransparencyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    gifUrl:
      'https://s3-ap-southeast-2.amazonaws.com/production.assets.merivale.com.au/wp-content/uploads/2021/04/08150528/meritales_christmas_ham.gif',
    transparencyText: '시간과 공간 상관없이 이어지는 작곡의 열기',
  },
};
