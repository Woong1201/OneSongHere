import type { Meta, StoryObj } from '@storybook/react';

import LogoText from './LogoText';

const meta = {
  title: 'atom/Common/LogoText',
  component: LogoText,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof LogoText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
