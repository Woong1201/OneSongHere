import type { Meta, StoryObj } from '@storybook/react';
import ProfileDropdown from './ProfileDropdown';

const meta = {
  title: 'molecule/Header/ProfileDropdown',
  component: ProfileDropdown,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof ProfileDropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    isShowed: true,
    items: [
      { label: '내 프로필', icon: '' },
      { label: '로그아웃', icon: '' },
    ],
  },
};
