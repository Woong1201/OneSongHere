import type { Meta, StoryObj } from '@storybook/react';

import DrumIcon from './DrumIcon';

const meta = {
  title: 'atom/StudioTab/DrumIcon',
  component: DrumIcon,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof DrumIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
