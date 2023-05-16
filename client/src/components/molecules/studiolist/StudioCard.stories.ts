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
    studioId: 1,
    studioTitle: '샵빱뚜비두바',
    startDate: new Date(2023, 4, 28),
    endDate: new Date(2023, 5, 29),
    tags: '재즈',
  },
};
