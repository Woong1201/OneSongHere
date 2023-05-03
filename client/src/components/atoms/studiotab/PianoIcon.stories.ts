import type { Meta, StoryObj } from '@storybook/react';

import PianoIcon from './PianoIcon';

const meta = {
  title: 'atom/StudioTab/PianoIcon',
  component: PianoIcon,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof PianoIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {},
};
