import type { Meta, StoryObj } from '@storybook/react';

import TextButton from 'components/atoms/buttons/TextButton';

const meta = {
  title: 'atom/Common/TextButton',
  component: TextButton,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof TextButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Composition: Story = {
  args: { label: '작곡' },
};
export const Community: Story = {
  args: { label: '커뮤니티' },
};
