import type { Meta, StoryObj } from '@storybook/react';

import StudioCam from './StudioCam';

const meta = {
  title: 'organism/Studio/StudioCam',
  component: StudioCam,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioCam>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
