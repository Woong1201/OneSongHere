import type { Meta, StoryObj } from '@storybook/react';

import StudioCard from 'components/molecules/studiolist/StudioCard';

const meta = {
  title: 'molecule/StudioList/StudioCard',
  component: StudioCard,
  tags: ['autodocs'],
  argTypes: {
    //
  },
} satisfies Meta<typeof StudioCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    studioTitle: '방 제목',
  },
};
