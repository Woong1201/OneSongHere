import type { Meta, StoryObj } from '@storybook/react';

import StudioInstrument from './StudioInstrument';

const meta = {
  title: 'organism/Studio/StudioInstrument',
  component: StudioInstrument,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioInstrument>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    findInputTiming: () => {
      return 1;
    },
  },
};
