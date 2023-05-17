import type { Meta, StoryObj } from '@storybook/react';

import StudioTitle from './StudioTitle';

const meta = {
  title: 'molecule/StudioHeader/StudioTitle',
  component: StudioTitle,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    studioTitle: '안뇽',
  },
};
