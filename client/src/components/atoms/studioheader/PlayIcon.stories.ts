import type { Meta, StoryObj } from '@storybook/react';

import PlayIcon from './PlayIcon';

const meta = {
  title: 'atom/StudioHeader/PlayIcon',
  component: PlayIcon,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof PlayIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
